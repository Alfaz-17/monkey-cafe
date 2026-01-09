import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const router = express.Router();

// Configure Multer (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Public (or Private)
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'monkey-cafe' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req);
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image upload failed' });
    }
});

export default router;
