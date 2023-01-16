import { makeAutoObservable } from "mobx";
import { UserType } from "../types/user";
class User {
  user: any = {};

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new User();

export default store;
