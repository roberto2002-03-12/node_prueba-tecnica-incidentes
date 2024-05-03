// import { Request, Response, NextFunction } from 'express';
// import createHttpError from 'http-errors';
import multer from "multer";

// const storageImages = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
//   }
// });

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // limite por imagen
    fileSize: 5 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
      return cb(new Error('Please upload a valid image file'))
    }
    cb(null, true)
  }
})
