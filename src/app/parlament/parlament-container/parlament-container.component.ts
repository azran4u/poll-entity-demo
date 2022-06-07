import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as parlamentAction from '../parlament.actions';
import { ParlamentEntity } from '../parlament.model';
import * as parlamentSelectors from '../parlament.selectors';
import { ParlamentService } from '../parlament.service';
import { AppState } from '../parlament.state';

@Component({
  selector: 'app-parlament-container',
  templateUrl: './parlament-container.component.html',
  styleUrls: ['./parlament-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParlamentContainerComponent implements OnInit, OnDestroy {
  operations$: Observable<ParlamentEntity[]>;
  operationsFromService$: Observable<ParlamentEntity[]> = of([]);

  mos$: Observable<ParlamentEntity[]>;
  mosFromService$: Observable<ParlamentEntity[]> = of([]);

  areas$: Observable<ParlamentEntity[]> = of([]);
  areasFromService$: Observable<ParlamentEntity[]> = of([]);

  constructor(
    public store: Store<AppState>,
    private parlamentService: ParlamentService
  ) {
    this.operations$ = this.store.select(
      parlamentSelectors.selectAllOperationsAsParlamentEntity
    );
    this.mos$ = this.store.select(
      parlamentSelectors.selectAllMoAsParlamentEntity
    );

    this.areas$ = this.store.select(
      parlamentSelectors.selectAllAreaAsParlamentEntity
    );

    this.operationsFromService$ = this.parlamentService.getAllOperations();
    this.mosFromService$ = this.parlamentService.getAllMo();
    this.areasFromService$ = this.parlamentService.getAllArea();
  }

  ngOnInit() {
    this.openSubscription();
  }

  ngOnDestroy(): void {
    this.closeSubscription();
  }

  openSubscription() {
    this.store.dispatch(
      parlamentAction.actionOperationDesiredByName({ names: ['op1', 'op2'] })
    );
  }

  closeSubscription() {
    this.store.dispatch(
      parlamentAction.actionOperationDesiredByName({ names: [] })
    );
  }
}
