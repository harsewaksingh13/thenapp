import {ReactNode} from 'react';

export interface AppRoute {
  key: string;
  path: string;
  component: ReactNode;
}
