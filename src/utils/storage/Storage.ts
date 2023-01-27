interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default abstract class Storage<T extends string, Value extends Object> {
  private readonly storage: IStorage;

  public constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }

  protected get(key: T): Value[] {
    return JSON.parse(this.getString(key));
  }

  protected getString(key: T): string {
    return this.storage.getItem(key) || "[]";
  }

  protected set(key: T, value: Value[]): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  protected add(key: T, value: Value): void {
    const history = this.get(key);
    history.push(value);
    this.set(key, history);
  }

  protected clearItem(key: T): void {
    this.storage.removeItem(key);
  }

  protected clearItems(keys: T[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}
