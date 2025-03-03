import dbHelper from '../DatabaseHelper/dbHelper.js';
import {addPollSchema} from '../Middleware/validation.js'
// import { topicEmail } from '../Services/emailService.js';

export async function addOpinion(req, res) {

    try {
        // const { error } = addPollSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: `Schema validation failed ${error.message}` });
        // }
        const { opinion, topicId } = req.body
        const userId = req.user.id;

        await dbHelper.executeProcedure('addOpinion', {opinion, topicId, userId})
        res.status(201).json({ message: `Your opinion has been received` });


    } catch (error) {
        console.error('An error occured while adding opinion', error)
        res.status(500).json({ message: `Internal server error, ${error}` })
    }

}
export async function getAllOpinions(req, res) {
    try {
        const { topicId } = req.body
        const opinionsFound = await dbHelper.executeProcedure('getOpinions', { topicId });

        // const opinions = await dbHelper.executeProcedure("getOpinions");
        res.status(200).json(opinionsFound);
        
    } catch (error) {
        console.error("Error fetching opinions:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function getUserOpinionsOnTopic(req, res) {
    try {

        const { opinionId } = req.body
        const userId = req.user.id;

        
        const opinionsFound = await dbHelper.executeProcedure('getUserOpinionsOnTopic', { opinionId, userId });
        
        if (opinionsFound) {
            return res.status(200).json(opinionsFound)
        }else {
            return res.status(404).json({ message: `Opinions not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}


export async function deleteOpinion(req, res) {
    try {
        const { opinionId } = req.params
        
        const opinionFound = await dbHelper.executeProcedure('getOpinionById', { opinionId });
        
        if (opinionFound) {
            await dbHelper.executeProcedure('deleteOpinion', { opinionId });            
            return res.status(200).json({ message: `Your opinion has been deleted successfully` })
        } else {
            return res.status(404).json({ message: `Opinion not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}