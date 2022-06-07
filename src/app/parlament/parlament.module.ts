import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParlamentContainerComponent } from './parlament-container/parlament-container.component';
import { StoreModule } from '@ngrx/store';
import { parlamentReducer } from './parlament.reducer';
import { GraphQLModule } from './graphql.module';
import { ParlamentService } from './parlament.service';
import { ParlamentEntityViewComponentComponent } from './parlament-entity-view-component/parlament-entity-view-component.component';
import { MaterialModule } from './material.module';
import { parlamentFeatureKey } from './parlament.state';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { ParlamentEffects } from './parlament.effects';

@NgModule({
  declarations: [
    ParlamentContainerComponent,
    ParlamentEntityViewComponentComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(parlamentFeatureKey, parlamentReducer),
    EffectsModule.forFeature([ParlamentEffects]),
    GraphQLModule,
    MaterialModule,
  ],
  providers: [ParlamentService],
  exports: [ParlamentContainerComponent],
})
export class ParlamentModule {}
