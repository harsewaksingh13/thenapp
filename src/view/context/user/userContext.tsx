import {LoginRequest, RegisterRequest} from '../../../api/models';
import {UserActions} from './userActions';
import {userManager} from '../../../data/';
import navigator from '../../navigation/appNavigator';
import {User} from '../../../data/';
import {initialSession} from '../../../data/';
import {dataManager} from '../../../data/';
import {AppActions} from '../appActions';

export class UserActionsImpl implements UserActions {
  appActions: AppActions;

  constructor(appActions: AppActions) {
    this.appActions = appActions;
  }

  login(loginRequest: LoginRequest): void {
    this.appActions.processing();
    userManager
      .login(loginRequest)
      .then((res) => {
        this.appActions.done();
        this.appActions.user(res);
        this.appActions.session(dataManager.readSession());
        navigator.user().home();
      })
      .catch((error) => {
        this.appActions.done();
        console.log('Error ' + JSON.stringify(error));
        alert(error.message);
      });
  }

  logout(): void {
    userManager
      .logout()
      .then((res) => {
        console.log(res);
        //todo: handle logout dispatch
        let {email} = dataManager.readSession();
        let user: User = {firstName: '', lastName: '', email: email};
        this.appActions.user(user);
        this.appActions.session(initialSession);
        this.appActions.idle();
        navigator.user().login();
      })
      .catch((error) => {
        console.log(error);
        //todo: handle error dispatch
      });
  }

  register(registerRequest: RegisterRequest): void {
    this.appActions.processing();
    userManager
      .register(registerRequest)
      .then((res) => {
        this.appActions.done();
        this.appActions.user(res);
        this.appActions.session(dataManager.readSession());
        navigator.user().home();
      })
      .catch((error) => {
        this.appActions.done();
        console.log('Error ' + JSON.stringify(error));
        alert(error.message);
      });
  }
}
