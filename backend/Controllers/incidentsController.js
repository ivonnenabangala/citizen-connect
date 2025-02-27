import dbHelper from '../DatabaseHelper/dbHelper.js';
import {uploadFile} from '../Middleware/uploadFiles.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const uploadImage = uploadFile('images').array('images', 5);

export async function addIncident(req, res) {

    uploadImage(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { title, description, location  } = req.body;
            const imageUrls = req.files.map(file => file.location); // S3 image URLs
            const userId = req.user.id

            await dbHelper.executeProcedure('addIncident', { 
                title, description, location, userId, imageUrls: JSON.stringify(imageUrls)
             });

            res.status(201).json({
                message: 'Incident reported successfully',
                imageUrls
            });

        } catch (error) {
            console.error('An error occurred while reporting your incident', error);
            res.status(500).json({ message: `Internal server error: ${error.message}` });
        }
    });

}
export async function getAllIncidents(req, res) {
    try {

        const results = await dbHelper.executeProcedure('getIncidents');
        res.status(200).json(results);
        
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function getIncident(req, res) {
    try {

        const { incidentId } = req.params;
        
        const result = await dbHelper.executeProcedure('getIncidentById', { incidentId });

        if (!result) {
            return res.status(404).json({ message: `Incident not found` });
        }

        const incidentFound = result

        incidentFound.imageUrls = incidentFound.imageUrls ? JSON.parse(incidentFound.imageUrls) : [];

        return res.status(200).json(incidentFound);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}


export async function deleteIncident(req, res) {
    try {
        const { incidentId } = req.params
        
        const incidentFound = await dbHelper.executeProcedure('getIncidentById', { incidentId });
        
        if (incidentFound) {
            await dbHelper.executeProcedure('deleteIncident', { incidentId });            
            return res.status(200).json({ message: `Incident has been deleted successfully` })
        } else {
            return res.status(404).json({ message: `Incident not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}