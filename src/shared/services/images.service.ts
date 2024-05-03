import { PutObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import S3Client from '../../config/aws-s3'
import config from '../../config'
import { Buffer } from 'buffer'
import { IFoto } from '../../api/incidentes/model';

// desafortunadamente aws no ofrece una opción de upload many images
export const uploadImage = async (fileBuffer: Buffer, fileName: string) => {
  try {
    const result = await S3Client.send(new PutObjectCommand({
      Bucket: config.AWS_BUCKET_NAME_S3,
      Body: fileBuffer,
      Key: fileName
    }));
  
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteImages = async (fotos: IFoto[]) => {
  try {
    const keys: { Key: string }[] = fotos.map(foto => ({ Key: foto.fotoNombre }));

    const params = {
      Bucket: config.AWS_BUCKET_NAME_S3,
      Delete: {
        Objects: keys,
        Quiet: false
      }
    }
    const result = await S3Client.send(new DeleteObjectsCommand(params));

    return result;
  } catch (error) {
    throw error;
  }
}

export const generateUrl = (fileName: string) =>
  `https://${config.AWS_BUCKET_NAME_S3}.s3.${config.AWS_BUCKET_REGION_S3}.amazonaws.com/${fileName}`
