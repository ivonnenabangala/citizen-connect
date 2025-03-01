import dbHelper from '../DatabaseHelper/dbHelper.js';
import {uploadFile} from '../Middleware/uploadFiles.js';


const uploadDocument = uploadFile('documents').single('document');

export async function addDocument(req, res) {

    uploadDocument(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { title, description } = req.body;
            const fileUrl = req.file.location; // S3 File URL

            await dbHelper.executeProcedure('addDocument', { title, description, fileUrl });

            res.status(201).json({
                message: 'Document uploaded successfully',
                fileUrl
            });

        } catch (error) {
            console.error('An error occurred while uploading the document', error);
            res.status(500).json({ message: `Internal server error: ${error.message}` });
        }
    });

}
export async function getAllDocuments(req, res) {
    try {

        const results = await dbHelper.executeProcedure('getDocuments');
        res.status(200).json(results);
        
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function getDocument(req, res) {
    try {

        const { documentId } = req.params
        
        const documentFound = await dbHelper.executeProcedure('getDocumentById', { documentId });
        
        if (documentFound) {
            return res.status(200).json(documentFound)
        } else {
            return res.status(404).json({ message: `Document not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}


export async function deleteDocument(req, res) {
    try {
        const { documentId } = req.params
        
        const documentFound = await dbHelper.executeProcedure('getDocumentById', { documentId });
        
        if (documentFound) {
            await dbHelper.executeProcedure('deleteDocument', { documentId });            
            return res.status(200).json({ message: `Document has been deleted successfully` })
        } else {
            return res.status(404).json({ message: `Document not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}