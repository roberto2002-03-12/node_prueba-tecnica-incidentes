import { createTransport, SendMailOptions } from 'nodemailer';
import config from '../../config';

export const sendMail = async (emailOptions: SendMailOptions) => {
  try {
    let transport = createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE,
      auth: {
        user: config.EMAIL_ACCESS_KEY,
        pass: config.EMAIL_SECRET_KEY
      }
    });

    if (typeof config.EMAIL_SERVICE !== 'undefined' && config.EMAIL_SERVICE !== '') {
      transport = createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
          user: config.EMAIL_ACCESS_KEY,
          pass: config.EMAIL_SECRET_KEY
        }
      });
    };

    if (config.EMAIL_SECURE === false) {
      transport = createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: config.EMAIL_SECURE,
        auth: {
          user: config.EMAIL_ACCESS_KEY,
          pass: config.EMAIL_SECRET_KEY
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }

    return await transport.sendMail(emailOptions);
  } catch (error) {
    throw error;
  }
};