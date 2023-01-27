import { TranslationHistory } from "src/sections/translations/History";
import Storage from "./Storage";

enum KEYS {
  HISTORY = "history",
}

export default class History extends Storage<KEYS, TranslationHistory> {
  public constructor(getStorage = () => window.localStorage) {
    super(getStorage);
  }

  public getHistory() {
    return this.get(KEYS.HISTORY);
  }

  public addHistory(history: TranslationHistory) {
    this.add(KEYS.HISTORY, history);
    return new History();
  }

  public clear() {
    this.clearItem(KEYS.HISTORY);
    return new History();
  }

  public toString() {
    return this.getString(KEYS.HISTORY);
  }

  public valueOf() {
    return this.get(KEYS.HISTORY);
  }
}
