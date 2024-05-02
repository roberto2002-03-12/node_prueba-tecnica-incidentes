import { IProfile } from './profile.model';

export interface CreateProfile extends Omit<IProfile, 'id'> {};

interface UpdateProfileOmits extends Omit<IProfile, 'id' | 'created_at' | 'created_by'> {};

export interface UpdateProfile extends Partial<UpdateProfileOmits> {};