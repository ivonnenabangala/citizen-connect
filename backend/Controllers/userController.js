import dbHelper from '../DatabaseHelper/dbHelper.js';
import {addUserSchema, loginSchema} from '../Middleware/validation.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export async function addUser(req, res) {

    try {
        const { error } = addUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: `Schema validation failed ${error.message}` });
        }

        const { username, email, password, role = "user" } = req.body

        const checkEmail = await dbHelper.executeProcedure('getUserByEmail', { email: email })
        console.log(`Result from checkEmail ${checkEmail}`);

        if (checkEmail.length > 0) {
            return res.status(400).json({ message: 'User with that email already exists' })
        }

        const userId = uuidv4()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbHelper.executeProcedure('InsertUpdateUser', {
            id: userId,
            username,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json({ message: `User created successfully`, });
        // TODO: => Call send welcome email

        // if(userCreated){
        //     // TODO: => Call send welcome email
        //     res.status(201).json({message: `User created successfully`,});
        // } else{
        //     console.error("User creation failed, response:", userCreated);
        //     res.status(500).json({message: 'Error creating user'});
        // }

    } catch (error) {
        console.error('An error occured while adding user', error)
        res.status(500).json({ message: `Internal server error, ${error}` })
    }

}
export async function getAllUsers(req, res) {
    try {
        const users = await dbHelper.executeProcedure("getAllUsers");
        res.status(200).json(users);
        
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function updateUser(req, res) {
    try {

        const { id } = req.params;
        console.log(`ID ${id}`);
        console.log(`Request body: ${JSON.stringify(req.body)}`);

        const { password, role } = req.body;

        const userFound = await dbHelper.executeProcedure('getUserById', { id });

        if (userFound.length === 0) {
            return res.status(404).json({ message: `User not found` });
        }

        let updatedFields = {};

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            updatedFields.role = role;
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const updatedUser = {
            ...userFound[0],
            ...updatedFields
        };

        await dbHelper.executeProcedure('InsertUpdateUser', updatedUser);

        res.status(200).json({ message: `User updated successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const userFound = await dbHelper.executeProcedure('getUserById', { id });

        if (userFound) {
            await dbHelper.executeProcedure('deleteUser', { id });
            return res.status(200).json({ message: `User deleted successfully` })
        } else {
            return res.status(404).json({ message: `User not found` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: `Internal server erro: ${error.message}` })
    }

}

export async function login(req, res) {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: `Schema validation failed ${error.message}` });
        }
        const { email, password } = value
        const user = await dbHelper.executeProcedure('getUserByEmail', { email: email });
        console.log(user[0]);
        console.log(email, password);
        // console.log(res.status);
        
        
        const userLoggedIn = user[0]
        console.log(userLoggedIn.password);
        
        if (userLoggedIn) {
            const validPassword = bcrypt.compare(password, userLoggedIn.password)

            if (validPassword) {
                const token = jwt.sign(
                    { id: userLoggedIn.id, email: userLoggedIn.email, role: userLoggedIn.role }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '2h' }
                  );
                  
                res.status(200).json({ token });
            } else {

            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Login failed' });
    }
}


