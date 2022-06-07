import { ActionReducerMap } from '@ngrx/store';
import { Area, ID, Mo, Operation } from './parlament.model';
import { parlamentReducer } from './parlament.reducer';

export const parlamentFeatureKey = 'parlament';

export interface ParlamentState {
  operations: Map<ID, Operation>;
  mos: Map<ID, Mo>;
  areas: Map<ID, Area>;
}

export interface AppState {
  parlament: ParlamentState;
}


