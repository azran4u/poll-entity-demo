import { createAction, props } from '@ngrx/store';
import { Area, ID, Mo, Operation } from './parlament.model';

// operation actions
export const actionOperationDesiredByName = createAction(
  '[Operation] Desired By Name',
  props<{ names: string[] }>()
);

export const actionOperationFetchByIds = createAction(
  '[Operation] Fetch By Ids',
  props<{ ids: ID[] }>()
);

export const actionOperationUpserted = createAction(
  '[Operation] Upserted',
  props<{ upserted: Operation[] }>()
);

export const actionOperationDeleted = createAction(
  '[Operation] Deleted',
  props<{ deleted: ID[] }>()
);

export const actionMoUpserted = createAction(
  '[Mo] Upserted',
  props<{ upserted: Mo[] }>()
);

export const actionMoDeleted = createAction(
  '[Mo] Deleted',
  props<{ deleted: ID[] }>()
);

export const actionAreaUpserted = createAction(
  '[Area] Upserted',
  props<{ upserted: Area[] }>()
);

export const actionAreaDeleted = createAction(
  '[Area] Deleted',
  props<{ deleted: ID[] }>()
);

export const actionNetworkFailure = createAction(
  'Network Failure',
  props<{ component: string; error: Error }>()
);

export const actionWsConnected = createAction('[ALL ENTITIES] WS Connected');
