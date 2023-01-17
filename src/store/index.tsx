import { makeAutoObservable } from "mobx";
import { UserType } from "../types/user";
class User {
  user: UserType = {};
  loading = false;
  error = {};
  repoPageSize = 10;
  curPage = 1

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new User();

export default store;
