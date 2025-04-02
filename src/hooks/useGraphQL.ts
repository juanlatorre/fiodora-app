import {
  useQuery as useReactQuery,
  useMutation as useReactMutation,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { execute } from '../graphql/execute';
import type { TypedDocumentString } from '../gql/graphql';

interface UseMutationOptions<TData, TVariables extends Record<string, unknown>> {
  query: TypedDocumentString<TData, TVariables>;
}

export function useMutation<TData, TVariables extends Record<string, unknown>>(
  queryOrOptions: TypedDocumentString<TData, TVariables> | UseMutationOptions<TData, TVariables>,
): UseMutationResult<TData, Error, TVariables> {
  const isOptions = (arg: any): arg is UseMutationOptions<TData, TVariables> =>
    typeof arg === 'object' && 'query' in arg;

  const query = isOptions(queryOrOptions) ? queryOrOptions.query : queryOrOptions;

  return useReactMutation<TData, Error, TVariables>({
    mutationFn: async variables => {
      const result = await execute<TData, TVariables>(query, variables);
      return result;
    },
  });
}

export function useQuery<TData, TVariables extends Record<string, unknown>>(
  query: TypedDocumentString<TData, TVariables>,
  variables?: TVariables,
  enabled?: boolean,
): UseQueryResult<TData, Error> {
  return useReactQuery<TData>({
    queryKey: [query, variables],
    queryFn: async () => {
      const result = await execute<TData, TVariables>(query, variables);
      return result;
    },
    enabled,
  });
}
