import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { InMemoryCache, split } from '@apollo/client/core';
import { ApolloClientOptions } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { Store } from '@ngrx/store';
import * as parlamentActions from './parlament.actions';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:8080/v1/graphql';
const wsUri = 'ws://localhost:8080/v1/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const graphqlClient = httpLink.create({ uri });

  const webSocketClient = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
      inactivityTimeout: 5000,
      connectionCallback: (error, result) => {
        console.log(`ws reconnected error=${error} result=${result}`);
      },
    },
  });

  return {
    link: split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      webSocketClient,
      graphqlClient
    ),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: 'no-cache' },
      mutate: { fetchPolicy: 'no-cache' },
      watchQuery: { fetchPolicy: 'no-cache' },
    },
  };
}

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  declarations: [],
})
export class GraphQLModule {}
