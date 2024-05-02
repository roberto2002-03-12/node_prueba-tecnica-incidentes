import { DataBase } from '../../../database';
import { CreateProfile, UpdateProfile } from '../model';
import config from '../../../config';
import moment from 'moment-timezone';

export const updateProfileService = async (data: UpdateProfile, userId: number) => {
  try {
    const profile = await DataBase.instance.profile.findOne({
      where: {
        userId
      }
    });

    const dateNow = moment().tz(config.TIME_ZONE);
    const dateNowFormat = dateNow.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
    if (!profile) {
      const newProfile: CreateProfile = {
        firstName: data.firstName ?? 'not registed',
        lastName: data.lastName ?? 'not registed',
        birth: data.birth ?? new Date(dateNowFormat),
        phoneNumber: data.phoneNumber ?? 'not registed',
        userId: userId,
        created_by: userId,
        created_at: dateNowFormat,
        updated_by: userId,
        updated_at: dateNowFormat
      }

      await DataBase.instance.profile.create(newProfile);

      return { message: 'profile created successfully' }
    }
  
    await profile.update(data);

    return { message: 'profile successfully updated' };
  } catch (error) {
    throw error;
  }
}