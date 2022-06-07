import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Area, BaseEntity, ID, Mo, Operation } from './parlament.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ParlamentService {
  constructor(private apollo: Apollo) {}

  getOperationsByIds(ids: ID[]): Observable<Operation[]> {
    if (_.isEmpty(ids)) return of([]);
    return this.apollo
      .query<{ parlament_operations: Operation[] }>({
        query: gql`
          query operationsByIds($ids: [uuid!]) {
            parlament_operations(where: { id: { _in: $ids } }) {
              id
              name
              updated_at
              entity
            }
          }
        `,
        variables: { ids },
      })
      .pipe(
        map((res) => res.data?.parlament_operations ?? []),
        map((x) =>
          x.map((op) => {
            return { ...op, ...op.entity } as Operation;
          })
        )
      );
  }

  getMoByIds(ids: ID[]): Observable<Mo[]> {
    if (_.isEmpty(ids)) return of([]);
    return this.apollo
      .query<{ parlament_mos: Mo[] }>({
        query: gql`
          query mosByIds($ids: [uuid!]) {
            parlament_mos(where: { id: { _in: $ids } }) {
              id
              name
              updated_at
              entity
            }
          }
        `,
        variables: { ids },
      })
      .pipe(
        map((res) => res.data?.parlament_mos ?? []),
        map((x) =>
          x.map((mo) => {
            return { ...mo, ...mo.entity } as Mo;
          })
        )
      );
  }

  getAreaByIds(ids: ID[]): Observable<Area[]> {
    if (_.isEmpty(ids)) return of([]);
    return this.apollo
      .query<{ parlament_areas: Area[] }>({
        query: gql`
          query areasByIds($ids: [uuid!]) {
            parlament_areas(where: { id: { _in: $ids } }) {
              id
              name
              updated_at
              entity
            }
          }
        `,
        variables: { ids },
      })
      .pipe(
        map((res) => res.data?.parlament_areas ?? []),
        map((x) =>
          x.map((area) => {
            return { ...area, ...area.entity } as Mo;
          })
        )
      );
  }

  subscribeToOperationsByName(names: string[]): Observable<BaseEntity[]> {
    if (_.isEmpty(names)) return of([]);
    return this.apollo
      .subscribe<{
        parlament_operations: BaseEntity[];
      }>({
        query: gql`
          subscription subscribeToOperationsByNames($names: [String!]) {
            parlament_operations(where: { name: { _in: $names } }) {
              id
              updated_at
            }
          }
        `,
        variables: { names },
      })
      .pipe(map((res) => res.data?.parlament_operations ?? []));
  }

  subscribeToMosByIds(ids: string[]): Observable<BaseEntity[]> {
    if (_.isEmpty(ids)) return of([]);
    return this.apollo
      .subscribe<{
        parlament_mos: BaseEntity[];
      }>({
        query: gql`
          subscription subscribeToMosByIds($ids: [uuid!]) {
            parlament_mos(where: { id: { _in: $ids } }) {
              id
              updated_at
            }
          }
        `,
        variables: { ids },
      })
      .pipe(map((res) => res.data?.parlament_mos ?? []));
  }

  subscribeToAreasByIds(ids: string[]): Observable<BaseEntity[]> {
    if (_.isEmpty(ids)) return of([]);
    return this.apollo
      .subscribe<{
        parlament_areas: BaseEntity[];
      }>({
        query: gql`
          subscription subscribeToAreasByIds($ids: [uuid!]) {
            parlament_areas(where: { id: { _in: $ids } }) {
              id
              updated_at
            }
          }
        `,
        variables: { ids },
      })
      .pipe(map((res) => res.data?.parlament_areas ?? []));
  }

  getAllOperations(): Observable<Operation[]> {
    return this.apollo
      .watchQuery<{ parlament_operations: Operation[] }>({
        query: gql`
          query getAllOperations {
            parlament_operations {
              id
              name
              entity
              updated_at
            }
          }
        `,
        pollInterval: 1000,
      })
      .valueChanges.pipe(
        tap((data) =>
          console.log(
            `query getAllOperations value ${JSON.stringify(data, null, 4)}`
          )
        ),
        map((v) => v.data?.parlament_operations ?? []),
        map((x) =>
          x.map((op) => {
            return { ...op, ...op.entity } as Operation;
          })
        )
      );
  }

  getAllMo(): Observable<Mo[]> {
    return this.apollo
      .watchQuery<{ parlament_mos: Mo[] }>({
        query: gql`
          query getAllMo {
            parlament_mos {
              id
              name
              entity
              updated_at
            }
          }
        `,
        pollInterval: 1000,
      })
      .valueChanges.pipe(
        tap((v) =>
          console.log(`query getAllMo value ${JSON.stringify(v, null, 4)}`)
        ),
        map((v) => v.data?.parlament_mos ?? []),
        map((x) =>
          x.map((mo) => {
            return { ...mo, ...mo.entity } as Mo;
          })
        )
      );
  }

  getAllArea(): Observable<Area[]> {
    return this.apollo
      .watchQuery<{ parlament_areas: Area[] }>({
        query: gql`
          query getAllArea {
            parlament_areas {
              id
              name
              entity
              updated_at
            }
          }
        `,
        pollInterval: 1000,
      })
      .valueChanges.pipe(
        tap((v) =>
          console.log(`query getAllMo value ${JSON.stringify(v, null, 4)}`)
        ),
        map((v) => v.data?.parlament_areas ?? []),
        map((x) =>
          x.map((area) => {
            return { ...area, ...area.entity } as Mo;
          })
        )
      );
  }
}
