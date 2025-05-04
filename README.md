Citizen Connect
Citizen Connect is a web application designed to bridge the gap between citizens and government authorities by providing a platform for reporting issues, tracking their resolution, and fostering community engagement.

Features
User Authentication: Secure login and registration for citizens, government officials, and admins.

Issue Reporting: Citizens can report local issues (e.g. potholes, floods) with descriptions, images, and location tagging.

Issue Tracking: Real-time tracking of reported issues.

Opinion polls: Admins can create poll questions. Citizens submit their opinion (voting) and government officials have access to view the poll votes.

Government documents: Admins can upload government documents e.g Gazette notices, Finance bills, etc. Citizens and government officials have access to reading these documents.

ChatBot: A user can ask the bot questions about a given document. Ask what the document is about, it's summary, and any other information found in the selected document.

Notifications: Email updates of activities done on the app like successful registration, password reset, notification of new published documents etc.


Technologies Used
Frontend: Angular, Angular Material, BootStrap

Backend: Node.js, Express.js, FastApi, Nodemailer

Database: Microsoft SQL Server

Authentication: JWT (JSON Web Tokens)

Cloud Storage: AWS S3 bucket

Deployment: AWS

CI/CD: Docker, Github actions

Tests: Cypress, Jasmine

Installation
Prerequisites
Node.js (v22 or later)

Microsoft SQL Server

AWS account 

Git

Steps
Clone the repository:

bash
git clone https://github.com/ivonnenabangala/citizen-connect.git
cd citizen-connect
Install dependencies:

bash
cd citizen-connect-fe && npm install
cd ../backend && npm install
cd ../ai-integration && pip install -r requirements.txt

Set up environment variables:

Create a .env file in backend folder with:

DB_USER=your_user
DB_PASS=db_pass
DB_SERVER=server_IP
DB_NAME=db_name
JWT_SECRET=secret_key
EMAIL_USER=example@gmail.com
EMAIL_APP_PASSWORD=your_app_password
AWS_ACCESS_KEY_ID=AWS_access_key
AWS_SECRET_ACCESS_KEY=AWS_secret_key
AWS_REGION=s3_bucket_region
S3_BUCKET_NAME=s3_bucket_name

Run the 3 applications
