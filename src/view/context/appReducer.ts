import {AppAction, AppUpdateAction} from './appAction';
import {App} from '../../data';
import {dataManager} from '../../data';

export function appReducer(app: App, appUpdateAction: AppUpdateAction): App {
  switch (appUpdateAction.appAction) {
    case AppAction.theme: {
      break;
    }
    case AppAction.user: {
      break; //handle in default action mutate whole object
    }
  }
  //always mutate the object
  let appState = {...app, ...appUpdateAction.appUpdate};
  console.log('app state ' + JSON.stringify(appState));
  dataManager.save('app', appState);
  return appState;
}
