
import { makeAutoObservable } from "mobx";

class Store{
    accessToken: String = "";

    constructor(){
        makeAutoObservable(this);
    }

    addToken(token:string){
        this.accessToken = token;
    }
}

const store = new Store()
export default store;