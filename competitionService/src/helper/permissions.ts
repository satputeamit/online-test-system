import { and, or, rule, shield } from "graphql-shield";

function getPermissions(user:any) {
  if (user) {
      console.log("permsson : ", user)
    return user.permissions;
  }
  return [];
}

const isAuthenticated = rule()((_:any, args:any, { user }:any) => {
  console.log("isAuth:",user)
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
  console.log("user:",user,userPermissions.includes("rw:organizer_account"))
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
    getExamsQA:isAuthenticated,
    getResults:or(canReadOwnResult,isOrganizer),
    getSubjects:isAuthenticated,
    hello:isAuthenticated,
    getCandidateExamStatus: isAuthenticated,
    getExamsByCandidate:isAuthenticated,
    getResult:isAuthenticated,

    
  },
  Mutation:{   
    createExam : isOrganizer,
    addParticipants:isOrganizer,
    createQuesAns:isOrganizer,
    addSubject:or(isOrganizer, isAdmin),
    uploadFile:isAuthenticated,
    codeExec: isCandidate,
    codeSubmit: isCandidate,
    createCandidateExamStatus:isAuthenticated,
    updateCandidateExamStatus:isAuthenticated,
  }
});

export { permissions };
