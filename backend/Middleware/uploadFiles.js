import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {s3} from '../Config/awsConfig.js'
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export const uploadFile = (folder) =>
    multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.S3_BUCKET_NAME,
            // acl: 'public-read', 
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
                const fileName = `${Date.now()}-${file.originalname}`;
                cb(null, `${folder}/${fileName}`); 
            }
        }),
        fileFilter: function (req, file, cb) {
            const allowedMimeTypes = {
                documents: ['application/pdf'],
                images: ['image/jpeg', 'image/png', 'image/jpg']
            };

            if (
                (folder === 'documents' && allowedMimeTypes.documents.includes(file.mimetype)) ||
                (folder === 'images' && allowedMimeTypes.images.includes(file.mimetype))
            ) {
                cb(null, true);
            } else {
                cb(new Error(`Invalid file type for ${folder}. Allowed: ${allowedMimeTypes[folder].join(', ')}`), false);
            }
        }
    });