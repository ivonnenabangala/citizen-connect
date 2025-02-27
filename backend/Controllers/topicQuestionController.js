import dbHelper from '../DatabaseHelper/dbHelper.js';
import { topicEmail } from '../Services/emailService.js';

export async function addTopic(req, res) {

    try {

        const { question } = req.body
        const userEmail = req.user.email;

        await dbHelper.executeProcedure('addTopic', {
            question
        })
        res.status(201).json({ message: `Topic question created successfully`, });

        topicEmail(userEmail)

    } catch (error) {
        console.error('An error occured while adding topic question', error)
        res.status(500).json({ message: `Internal server error, ${error}` })
    }

}
export async function getAllTopics(req, res) {
    try {
        const topics = await dbHelper.executeProcedure("getTopics");
        res.status(200).json(topics);
        
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}


export async function deleteTopic(req, res) {
    try {
        const { topicId } = req.params
        console.log(topicId);
        
        const topicFound = await dbHelper.executeProcedure('getTopicById', { topicId });
        console.log(topicFound);
        
        
        if (topicFound) {
            await dbHelper.executeProcedure('deleteTopic', { topicId });
            console.log(topicFound);
            
            return res.status(200).json({ message: `Topic question deleted successfully` })
        } else {
            return res.status(404).json({ message: `Topic question not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}



