import {Session} from './models';
import storageManager from './storageManager';

interface DataManager {
  session(session: Session): void;

  readSession(): Session;

  hasSession(): boolean;

  clearSession(): void;

  saveObj<T extends Object>(obj: T): void;

  save<T>(key: string, obj: T): void;

  read<T>(key: string): T | null;

  /***
   *  read the saved object for key, provide initial value to return if object don't exist
   *  */
  readObject<T>(key: string, initial: T): T;
}

class DataManagerHandler implements DataManager {
  session(session: Session): void {
    this.setItem('Email', session.email);
    this.setItem('UserId', session.userId);
    this.setItem('Token', session.token);
  }

  readSession(): Session {
    return {
      email: this.getItem('Email') || '',
      token: this.getItem('Token') || '',
      userId: this.getItem('UserId') || '',
    };
  }

  private getItem(key: string): string | null {
    return storageManager.getItem(key);
  }

  private setItem(key: string, value: string): void {
    storageManager.setItem(key, value);
  }

  hasSession(): boolean {
    let token = this.getItem('Token');
    return token !== null && token.length > 0;
  }

  clearSession(): void {
    storageManager.clear();
  }

  saveObj<T extends Object>(obj: T): void {
    this.save(obj.constructor.name, obj);
  }

  save<T>(key: string, obj: T): void {
    this.setItem(key, JSON.stringify(obj));
  }

  read<T>(key: string): T | null {
    let item = this.getItem(key);
    console.log(' item == ' + item);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  readObject<T>(key: string, initial: T): T {
    let obj = this.read<T>(key);
    if (obj) {
      return obj;
    } else {
      return initial;
    }
  }
}

const dataManager: DataManager = new DataManagerHandler();

export default dataManager;
