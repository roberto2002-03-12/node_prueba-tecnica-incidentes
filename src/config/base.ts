// tener una interface base para no repetir código
export interface EnvironmentBase {
  PORT: string;

  // base de datos
  DB_NAME: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_PORT: string;

  // zona horaria
  TIME_ZONE: string;

  // AUTH
  JWT_SECRET: string;

  // S3 SERVICES AWS
  AWS_SECRET_KEY_S3?: string;
  AWS_ACCESS_KEY_S3?: string;
  AWS_BUCKET_REGION_S3?: string;
  AWS_BUCKET_NAME_S3?: string;

  // SES SERVICES AWS (Send email service)
  // AWS_SECRET_KEY_SES?: string;
  // AWS_ACCESS_KEY_SES?: string;
  // AWS_REGION_SES?: string;
  // AWS_SES_EMAIL?: string;
  // AWS_SES_HOST?: string;
  // AWS_SES_PORT?: number;

  // Send email no aws
  EMAIL_ACCESS_KEY?: string;
  EMAIL_SECRET_KEY?: string;

  EMAIL_USE?: string;

  // if you use this
  EMAIL_SERVICE?: string;

  // then you don't need this;
  EMAIL_SECURE?: boolean;
  EMAIL_HOST?: string;
  EMAIL_PORT?: number;

  // Captcha to verify human actions
  GOOGLE_CAPTCHA_CODE?: string;
}
