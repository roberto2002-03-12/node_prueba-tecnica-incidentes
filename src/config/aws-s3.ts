import { S3Client } from '@aws-sdk/client-s3';
import config from './'

const s3Client = new S3Client({
  region: config.AWS_BUCKET_REGION_S3!,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_S3!,
    secretAccessKey: config.AWS_SECRET_KEY_S3!
  }
});

export default s3Client;