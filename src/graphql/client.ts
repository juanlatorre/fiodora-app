import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://fiodora-api-production.up.railway.app/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    // Add any headers you need here
  },
});

// Type for GraphQL response
export type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
};
