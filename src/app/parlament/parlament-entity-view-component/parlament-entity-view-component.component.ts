import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { ID, ParlamentEntity } from '../parlament.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-parlament-entity-view-component',
  templateUrl: './parlament-entity-view-component.component.html',
  styleUrls: ['./parlament-entity-view-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParlamentEntityViewComponentComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild(MatSort)
  sort: MatSort | undefined;

  @Input()
  data: ParlamentEntity[] = [];

  @Input()
  title: string = '';

  @Output()
  deleted = new EventEmitter<ID>();

  @Output()
  updated = new EventEmitter<ID>();

  dataSource: MatTableDataSource<ParlamentEntity>;

  displayedColumns: string[] = ['id', 'name', 'childs'];

  constructor() {
    this.dataSource = new MatTableDataSource<ParlamentEntity>();
  }

  refresh() {
    this.dataSource.data =
      this.data.map((x) => {
        return {
          ...x,
          id: this.prettyPrintId(x.id),
          childs: x.childs.map((children) => this.prettyPrintId(children)),
        };
      }) ?? [];
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  prettyPrintId(id: string) {
    return id.slice(id.length - 3, id.length);
  }
}
