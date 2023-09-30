import { makeAutoObservable } from "mobx";

export default class Store {
  constructor() {
    this.state = {
      isLoading: false,
      currentContextUrl: "",
      chosenDataUrl: "",
      currentMode: "none", // "none", "source", "testDatabase"
      shouldUpdateSourceList: false,
      shouldUpdateContextList: false,
    };
    makeAutoObservable(this);
  }

  setIsLoading(value) {
    this.state.isLoading = value;
  }

  setCurrentContextUrl(value) {
    this.state.currentContextUrl = value;
  }

  setChosenDataUrl(value) {
    this.state.chosenDataUrl = value;
  }

  setShouldUpdateSourceList(value) {
    this.state.shouldUpdateSourceList = value;
  }
  setShouldUpdateContextList(value) {
    this.state.shouldUpdateContextList = value;
  }

  setCurrentMode(value) {
    this.state.currentMode = value;
  }
}
