import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })


export function verifyToken(allowedRoles = []) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Access denied, no token provided' });
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: 'Access denied, token missing' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded", decoded);
            
            req.user = { id: decoded.id, role: decoded.role }; 

            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}
