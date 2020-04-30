import {AppRoute} from './appRoute';

export interface RouteNavigator {
  appRoutes(): Array<AppRoute>;
}

export class BaseRouteNavigator implements RouteNavigator {
  history: History;

  constructor(history: History) {
    this.history = history;
  }

  appRoutes(): Array<AppRoute> {
    return [];
  }

  clearHistory(): void {
    //todo: handle clear history
  }
}
