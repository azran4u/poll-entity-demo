import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as parlamentAction from './parlament.actions';
import * as parlamentSelectors from './parlament.selectors';
import { ParlamentService } from './parlament.service';
import * as _ from 'lodash';
import { Area, ID, Mo, Operation } from './parlament.model';
import { pollEntity, PollEntityEnum } from './pollEntity';
import { AppState } from './parlament.state';

export const PARLAMENT_KEY = 'EXAMPLES.PARLAMENT';

@Injectable()
export class ParlamentEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private parlamentService: ParlamentService
  ) {}
  operationsEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(parlamentAction.actionOperationDesiredByName),
        switchMap(({ names }) =>
          pollEntity<Operation, ID>({
            discriminator: PollEntityEnum.rle,
            debug: true,
            entityName: 'operation',
            livequery: () =>
              this.parlamentService.subscribeToOperationsByName(names),
            byIds: (ids: ID[]) => this.parlamentService.getOperationsByIds(ids),
            myStore: () =>
              this.store.pipe(select(parlamentSelectors.selectAllOperations)),
            remove: (deleted: ID[]) =>
              this.store.dispatch(
                parlamentAction.actionOperationDeleted({ deleted })
              ),
            upsert: (upserted: Operation[]) =>
              this.store.dispatch(
                parlamentAction.actionOperationUpserted({ upserted })
              ),
          })
        )
      ),
    { dispatch: false }
  );

  moEffect = createEffect(
    () =>
      pollEntity<Mo, ID>({
        discriminator: PollEntityEnum.child,
        debug: true,
        entityName: 'mo',
        livequery: (ids: ID[]) =>
          this.parlamentService.subscribeToMosByIds(ids),
        fatherStore: () =>
          this.store.pipe(select(parlamentSelectors.selectAllOperationsMoIds)),
        byIds: (ids: ID[]) => this.parlamentService.getMoByIds(ids),
        myStore: () => this.store.pipe(select(parlamentSelectors.selectAllMo)),
        remove: (deleted: ID[]) =>
          this.store.dispatch(parlamentAction.actionMoDeleted({ deleted })),
        upsert: (upserted: Mo[]) =>
          this.store.dispatch(parlamentAction.actionMoUpserted({ upserted })),
      }),
    { dispatch: false }
  );

  areaEffect = createEffect(
    () =>
      pollEntity<Mo, ID>({
        discriminator: PollEntityEnum.child,
        debug: true,
        entityName: 'area',
        livequery: (ids: ID[]) =>
          this.parlamentService.subscribeToAreasByIds(ids),
        fatherStore: () =>
          this.store.select(parlamentSelectors.selectAllMosAreaIds),
        byIds: (ids: ID[]) => this.parlamentService.getAreaByIds(ids),
        myStore: () =>
          this.store.pipe(select(parlamentSelectors.selectAllAreas)),
        remove: (deleted: ID[]) =>
          this.store.dispatch(parlamentAction.actionAreaDeleted({ deleted })),
        upsert: (upserted: Area[]) =>
          this.store.dispatch(parlamentAction.actionAreaUpserted({ upserted })),
      }),
    { dispatch: false }
  );
}
