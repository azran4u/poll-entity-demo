export type ID = string;

export interface BaseEntity<T = ID> {
  id: T;
  updated_at: string;
  entity: ParlamentEntity;
}
export interface ParlamentEntity extends BaseEntity<ID> {
  name: string;
  childs: ID[];
}
export interface Operation extends ParlamentEntity {}

export interface Mo extends ParlamentEntity {}

export interface Area extends ParlamentEntity {}

export interface EntityUpdate<U = ID, D = ID> {
  upserted: U[];
  deleted: D[];
}
