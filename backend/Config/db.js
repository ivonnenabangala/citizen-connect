import dotenv from 'dotenv'
import path from 'path'
import mssql from 'mssql'
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:path.resolve(__dirname,'../.env')})

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Set to true for Azure SQL
        trustServerCertificate: true, // Set to true if using a self-signed certificate
    },
    pool: {
        max: 10, // Max connections in the pool
        min: 0,
        idleTimeoutMillis: 30000,
    },
};
// async function test() {
// 	try {
// 		const pool = await mssql.connect(dbConfig);
// 		const result = await pool.request().query('SELECT * FROM Users');
// 		console.log(result.recordset);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// test();
export default dbConfig;

