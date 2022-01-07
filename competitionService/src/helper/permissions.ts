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

const canReadWriteOwnAccount = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:own_account");
});



const permissions = shield({
  Query: {   
    usersProfile: isAuthenticated
    
  },
  Mutation:{
    createUserProfile: canReadWriteOwnAccount
  }
});

export { permissions };
