import { Strategy } from 'passport-local';
import { getUser } from '../../../api/auth/services/user/read.service';

export const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done) => {
    try {
      const user = await getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
)