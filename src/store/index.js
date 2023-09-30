import { makeAutoObservable } from "mobx";

export default class Store {
  constructor() {
    this.state = {
      isLoading: false,
      currentRoomId: "",
    };
    makeAutoObservable(this);
  }

  setIsLoading(value) {
    this.state.isLoading = value;
  }

  setCurrentRoomId(value) {
    this.state.currentRoomId = value;
  }
}
