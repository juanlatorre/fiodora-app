import { useQuery, useMutation } from '@tanstack/react-query';
import { graphqlClient, type GraphQLResponse } from '../graphql/client';

interface UseGraphQLOptions<TData, TVariables extends Record<string, unknown>> {
  query: string;
  variables?: TVariables;
  enabled?: boolean;
}

export function useGraphQL<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>({ query, variables, enabled = true }: UseGraphQLOptions<TData, TVariables>) {
  const isMutation = query.trim().startsWith('mutation');

  if (isMutation) {
    return useMutation<TData, Error, TVariables>({
      mutationFn: async variables => {
        const response = await graphqlClient.request<GraphQLResponse<TData>>(query, variables);
        return response.data;
      },
    });
  }

  return useQuery<TData>({
    queryKey: [query, variables],
    queryFn: async () => {
      const response = await graphqlClient.request<GraphQLResponse<TData>>(query, variables);
      return response.data;
    },
    enabled,
  });
}
