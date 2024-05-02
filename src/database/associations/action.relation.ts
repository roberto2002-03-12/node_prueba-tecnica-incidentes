import { RoleStatic, ActionStatic } from '../../api/privileges/model';

export const roleManyToManyAction = (
  {
    role,
    action
  } : {
    role: RoleStatic;
    action: ActionStatic;
  }
) => {
  role.belongsToMany(action, {
    through: 'role_action',
    foreignKey: 'role_id',
    otherKey: 'action_id',
    sourceKey: 'id',
    as: 'action',
    timestamps: false
  });

  action.belongsToMany(role, {
    through: 'role_action',
    foreignKey: 'action_id',
    otherKey: 'role_id',
    sourceKey: 'id',
    as: 'action',
    timestamps: false
  });
}