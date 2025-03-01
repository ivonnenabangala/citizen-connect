import dbHelper from '../DatabaseHelper/dbHelper.js';
import {voteSchema} from '../Middleware/validation.js'
import jwt from 'jsonwebtoken'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export async function addPoll(req, res) {

    try {

        const { question } = req.body

        await dbHelper.executeProcedure('addOrUpdatePoll', {
            question
        })
        res.status(201).json({ message: `Poll created successfully`, });
        // TODO: => Call send Poll created email

    } catch (error) {
        console.error('An error occured while adding poll', error)
        res.status(500).json({ message: `Internal server error, ${error}` })
    }

}
export async function getAllPolls(req, res) {
    try {
        const polls = await dbHelper.executeProcedure("getPolls");
        res.status(200).json(polls);
        
    } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function updatePoll(req, res) {
    try {
        const { id } = req.params;
        console.log(`ID ${id}`);
        console.log(`Request body: ${JSON.stringify(req.body)}`);

        const { question } = req.body;

        const pollFound = await dbHelper.executeProcedure('getPollById', { pollId: id });

        if (pollFound.length === 0) {
            return res.status(404).json({ message: `Poll not found` });
        }

        await dbHelper.executeProcedure('addOrUpdatePoll', {question: question, pollId: id});

        res.status(200).json({ message: `Poll updated successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
}

export async function updatePollVotes(req, res) {
    try {
        const { id: pollId } = req.params;
        // console.log(`ID ${pollId}`);
        // console.log(`Request body: ${JSON.stringify(req.body)}`);

        // input will come from a radio button either a yes or no
        const { error, value } = voteSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { vote } = value;
        const userId = req.user.id;

        const pollFound = await dbHelper.executeProcedure('getPollById', { pollId });

        if (pollFound.length === 0) {
            return res.status(404).json({ message: `Poll not found` });
        }

        const existingVote = await dbHelper.executeProcedure('checkUserVote', { userId, pollId });
        if (existingVote.length > 0) {
            return res.status(400).json({ message: `You have already voted on this poll` });
        }

        await dbHelper.executeProcedure('addVotePoll', {pollId, vote});
        await dbHelper.executeProcedure('insertUserVote', { userId, pollId});

        res.status(200).json({ message: `Poll count updated successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
}

export async function deletePoll(req, res) {
    try {
        const { id } = req.params
        const pollFound = await dbHelper.executeProcedure('getPollById', { pollId: id });

        if (pollFound) {
            await dbHelper.executeProcedure('deletePoll', { pollId: id });
            return res.status(200).json({ message: `Poll deleted successfully` })
        } else {
            return res.status(404).json({ message: `Poll not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}



