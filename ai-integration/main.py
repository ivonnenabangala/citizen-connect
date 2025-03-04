from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import requests
import os
import faiss
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_store = {}

class DocumentRequest(BaseModel):
    documentUrl: str
    documentId: str


class ChatRequest(BaseModel):
    documentId: str
    query: str

def extract_text_from_pdf(pdf_url: str) -> str:
    response = requests.get(pdf_url)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to download document")
    
    pdf_path = "temp.pdf"
    with open(pdf_path, "wb") as f:
        f.write(response.content)

    reader = PdfReader(pdf_path)
    text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])

    os.remove(pdf_path)
    return text

def create_vector_store(documentId: str, documentText: str):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = text_splitter.split_text(documentText)

    embeddings = OpenAIEmbeddings()
    vector_db = FAISS.from_texts(chunks, embeddings)

    vector_store[documentId] = vector_db
    return vector_db

@app.post("/process-document/")
async def process_document(request: DocumentRequest):
    print('>>>>>>>>>>>>>>>>')
    print('>>>>>>>>>>>>>>>>')

    try:
        text = extract_text_from_pdf(request.documentUrl)
        create_vector_store(request.documentId, text)
        print('<<<<<<<<<<')
        print('<<<<<<<<<<')
        # print("Current vector store keys:", vector_store.keys())  

        return {"message": "Document processed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/chat/")
async def chat_with_document(request: ChatRequest):
    # print("Available documents in store:", vector_store.keys())  
    # print("Received document ID:", request.documentId) 
    if request.documentId not in vector_store:
        raise HTTPException(status_code=400, detail="Document not found in vector store")

    vector_db = vector_store[request.documentId]
    results = vector_db.similarity_search(request.query, k=3)

    context = " ".join([r.page_content for r in results])

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI that answers questions based on a provided document."},
            {"role": "user", "content": f"Based on this document: {context}, answer: {request.query}"}
        ],
        max_tokens = 500
    )

    # print("Raw OpenAI Response:", response)
    # print("Generated Response:", response.choices[0].message.content)
    return {"response": response.choices[0].message.content}