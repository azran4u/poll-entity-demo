import { createSelector } from '@ngrx/store';

import { ID, ParlamentEntity } from './parlament.model';
import * as _ from 'lodash';
import { AppState } from './parlament.state';

export const selectParlamentState = (state: AppState) => state.parlament;

export const selectOperationsState = createSelector(
  selectParlamentState,
  (state) => state.operations
);

export const selectMoState = createSelector(
  selectParlamentState,
  (state) => state.mos
);

export const selectAreasState = createSelector(
  selectParlamentState,
  (state) => state.areas
);

export const selectAllOperations = createSelector(
  selectOperationsState,
  (map) => Array.from(map.values())
);

export const selectAllMo = createSelector(selectMoState, (map) =>
  Array.from(map.values())
);

export const selectAllOperationsMoIds = createSelector(
  selectAllOperations,
  (operations) => {
    return _.sortBy(
      _.uniq(_.flatten(operations.map((op) => op?.entity?.childs ?? [])))
    );
  }
);

export const selectAllMosAreaIds = createSelector(selectAllMo, (mos) => {
  const areaIds: ID[] = _.sortBy(
    _.uniq(_.flatten(mos.map((mo) => mo?.entity?.childs ?? [])))
  );
  return areaIds ?? [];
});

export const selectAllAreas = createSelector(selectAreasState, (map) =>
  Array.from(map.values())
);

export const selectAllOperationsAsParlamentEntity = createSelector(
  selectAllOperations,
  (allOperations) =>
    allOperations.map((op) => {
      return {
        ...op,
        childs: op?.entity?.childs ?? [],
      } as ParlamentEntity;
    })
);

export const selectAllMoAsParlamentEntity = createSelector(
  selectAllMo,
  (allMos) =>
    allMos.map((mo) => {
      return {
        ...mo,
        childs: mo?.childs ?? [],
      } as ParlamentEntity;
    })
);

export const selectAllAreaAsParlamentEntity = createSelector(
  selectAllAreas,
  (allAreas) =>
    allAreas.map((area) => {
      return {
        ...area,
        childs: area?.childs ?? [],
      } as ParlamentEntity;
    })
);
