import { DataBase } from "../../../../database";
import { sendMail } from '../../../../shared/services';
import { sign, verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import config from '../../../../config';
import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import { Transaction } from "sequelize";
import { SendMailOptions } from 'nodemailer';
import { IPayloadRecovery } from '../../../../shared/models';

export const changePasswordService = async (password: string, userId: number) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await DataBase.instance.user.update({
      password: passwordHash
    }, {
      where: {
        id: userId
      }
    });

    return { message: 'Password updated successfully' }
  } catch (error) {
    throw error;
  }
};

export const sendCodeRecoveryService = async (email: string) => {
  let transaction: Transaction = await DataBase.instance.sequelize.transaction();
  try {
    const userFound = await DataBase.instance.user.findOne({ where: { email, active: true } })

    if (!userFound) throw createHttpError(400, 'Email not found or user desactivated');

    const payload: IPayloadRecovery = {
      sub: userFound.dataValues.id
    };

    const token = sign(payload, config.JWT_SECRET, { expiresIn: '10min' })

    const result = userFound.update({
      recoveryToken: token
    }, { transaction });

    const sendMailOptions: SendMailOptions = {
      from: `User Management <${config.EMAIL_USE}>`,
      to: email,
      subject: `Code verification for changing password`,
      html: `
        <h3>User management service</h3>
        <p>Use a password that you can remember. Code: ${token}</p>
      `
    }

    await sendMail(sendMailOptions);

    await result;

    await transaction.commit();

    return { message: `Email sent to: ${email}. Code will be only available for approximately 10 minutes` }
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

export const changeForgotPasswordService = async (data: {recoveryToken: string; newPassword: string;}) => {
  try {
    const payload = verify(data.recoveryToken, config.JWT_SECRET);
    
    const user = await DataBase.instance.user.findOne({ 
      where: { 
        id: parseInt(payload.sub as string), 
        active: true,
      } 
    });

    if (!user) throw createHttpError(400, `Invalid user`);

    if (user.dataValues.recoveryToken === '') throw createHttpError(400, `Token has been used`)

    const passwordHash = await bcrypt.hash(data.newPassword, 10);

    await user.update({
      password: passwordHash,
      recoveryToken: '',
    });

    return { message: `Password changed successfully` };
  } catch (error: any) {
    if (error instanceof TokenExpiredError) throw createHttpError(400, `Token expired`);
    if (error instanceof JsonWebTokenError) throw createHttpError(400, `Invalid Token`);
    throw error;
  }
}