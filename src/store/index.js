import { makeAutoObservable } from "mobx";

export default class Store {
  constructor() {
    this.state = {
      isLoading: false,
      currentRoomId: "",
      chosenDataUrl: "",
      shouldUpdateList: false,
    };
    makeAutoObservable(this);
  }

  setIsLoading(value) {
    this.state.isLoading = value;
  }

  setCurrentRoomId(value) {
    this.state.currentRoomId = value;
  }

  setChosenDataUrl(value) {
    this.state.chosenDataUrl = value;
  }

  setShouldUpdateList(value) {
    this.state.shouldUpdateList = value;
  }
}
