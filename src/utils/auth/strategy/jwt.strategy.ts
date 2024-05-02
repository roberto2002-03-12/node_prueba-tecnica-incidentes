import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import config from '../../../config';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

export const jwtStrategy = new Strategy(options, (payload: any, done: VerifiedCallback) => {
  return done(null, payload);
});