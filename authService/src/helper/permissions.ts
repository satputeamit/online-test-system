import { and, or, rule, shield } from "graphql-shield";

function getPermissions(user:any) {
  if (user) {
      console.log("permsson : ", user)
    return user.permissions;
  }
  return [];
}

const isAuthenticated = rule()((_:any, args:any, { user }:any) => {
  return user !== null;
});

// const canReadAnyAccount = rule()((_:any, args:any, { user }:any) => {
//   const userPermissions = getPermissions(user);
//   return userPermissions.includes("read:any_account");
// });

const canReadWriteOwnAccount = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:own_account");
});

const isAdmin = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:admin_account");
});

// const isReadingOwnAccount = rule()((_:any, { id }:any, { user }:any) => {
//   return user && user.id === id;
// });

const permissions = shield({
  Query: {   
    usersProfile: isAuthenticated,
    getRoles:isAuthenticated,
    getUserInfo:isAuthenticated
    
  },
  Mutation:{
    createUserProfile: canReadWriteOwnAccount,
    addRole:isAdmin
  }
});

export { permissions };
