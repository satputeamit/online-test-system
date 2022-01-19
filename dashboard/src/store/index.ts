
import { makeAutoObservable } from "mobx";

class Store{
    accessToken: String = "";
    loggedIn: Boolean=false;
    username: String = "";
    examId:String="";
    candidateId: String="";
    organizerId:String="";

    constructor(){
        makeAutoObservable(this);
    }

    addToken(token:string){
        this.accessToken = token;
    }

    setLoggedIn(flag:Boolean){
        this.loggedIn = flag;
    }

    setUsername(username: String){
        this.username = username;
    }

    setExamId(id: String){
        this.examId = id;
    }

    setCandidateId(id: String){
        this.candidateId = id
    }

    setOrganizerId(id: String){
        this.organizerId = id
    }
}

const store = new Store()
export default store;