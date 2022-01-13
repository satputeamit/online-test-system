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

const canReadOwnResult = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:own_account");
});

const isOrganizer = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:organizer_account");
});

const isCandidate = rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:candidate_account");
});

const isAdmin= rule()((_:any, args:any, { user }:any) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("rw:admin_account");
});



const permissions = shield({
  Query: {      
    getExams:isAuthenticated,
    getParticipants:isOrganizer,
    getQAData:isOrganizer,
    getResults:or(canReadOwnResult,isOrganizer),
    getSubjects:isAuthenticated
    
  },
  Mutation:{   
    createExam : isOrganizer,
    addParticipants:isOrganizer,
    createQuesAns:isOrganizer,
    addSubject:or(isOrganizer, isAdmin)
  }
});

export { permissions };
