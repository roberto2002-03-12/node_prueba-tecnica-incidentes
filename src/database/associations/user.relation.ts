import { UserStatic } from '../../api/auth/model';
import { RoleStatic, UserRoleStatic } from '../../api/privileges/model';
import { ProfileStatic } from '../../api/profile/model';

export const userHasOneProfile = (
  {
    user,
    profile
  } : {
    user: UserStatic
    profile: ProfileStatic
  }
): void => {
  user.hasOne(profile, {
    foreignKey: 'user_id',
    as: 'profile'
  });

  profile.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export const userManyToManyRole = (
  {
    user,
    role
  } : {
    user: UserStatic
    role: RoleStatic
  }
): void => {
  user.belongsToMany(role, {
    through: 'user_role',
    foreignKey: 'user_id',
    otherKey: 'role_id',
    sourceKey: 'id',
    as: 'role',
    timestamps: false
  });

  role.belongsToMany(user, {
    through: 'user_role',
    foreignKey: 'role_id',
    otherKey: 'user_id',
    sourceKey: 'id',
    as: 'role',
    timestamps: false
  });
};

// export const tableRelationUserRole = (

// )