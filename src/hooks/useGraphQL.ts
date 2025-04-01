import { useQuery } from '@tanstack/react-query';
import { graphqlClient, type GraphQLResponse } from '../graphql/client';

interface UseGraphQLOptions<TVariables extends Record<string, unknown>> {
  query: string;
  variables?: TVariables;
  enabled?: boolean;
}

export function useGraphQL<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>({ query, variables, enabled = true }: UseGraphQLOptions<TVariables>) {
  return useQuery<TData>({
    queryKey: [query, variables],
    queryFn: async () => {
      const response = await graphqlClient.request<GraphQLResponse<TData>>(query, variables);
      return response.data;
    },
    enabled,
  });
}
