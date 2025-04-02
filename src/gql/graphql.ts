/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** A string that cannot be passed as an empty value */
  NonEmptyString: { input: any; output: any; }
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: { input: any; output: any; }
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: { input: any; output: any; }
  /** Integers that will have a value greater than 0. */
  PositiveInt: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: any; output: any; }
};

/** The payload returned when a user logs in */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** Auth token */
  token?: Maybe<Scalars['ID']['output']>;
  /** User entity */
  user?: Maybe<User>;
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message?: Maybe<Scalars['String']['output']>;
};

export type Error = {
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new user */
  createUser?: Maybe<MutationCreateUserResult>;
  /** Login a user and return a token */
  login?: Maybe<MutationLoginResult>;
};


export type MutationCreateUserArgs = {
  input: MutationCreateUserInput;
};


export type MutationLoginArgs = {
  input: MutationLoginInput;
};

export type MutationCreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationCreateUserResult = BaseError | MutationCreateUserSuccess | ZodError;

export type MutationCreateUserSuccess = {
  __typename?: 'MutationCreateUserSuccess';
  data: AuthPayload;
};

export type MutationLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationLoginResult = BaseError | MutationLoginSuccess | ZodError;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: AuthPayload;
};

export type Query = {
  __typename?: 'Query';
  /** Get user by id */
  user?: Maybe<QueryUserResult>;
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};

export type QueryUserResult = BaseError | QueryUserSuccess | ZodError;

export type QueryUserSuccess = {
  __typename?: 'QueryUserSuccess';
  data: User;
};

/** User entity */
export type User = {
  __typename?: 'User';
  /** User creation date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** User email */
  email?: Maybe<Scalars['String']['output']>;
  /** User UUID */
  id?: Maybe<Scalars['ID']['output']>;
  /** User name */
  name?: Maybe<Scalars['String']['output']>;
  /** User role */
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ZodError = Error & {
  __typename?: 'ZodError';
  fieldErrors?: Maybe<Array<ZodFieldError>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type LoginMutationVariables = Exact<{
  input: MutationLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename: 'BaseError', message?: string | null } | { __typename: 'MutationLoginSuccess', data: { __typename?: 'AuthPayload', token?: string | null } } | { __typename: 'ZodError', message?: string | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: MutationLoginInput!) {
  login(input: $input) {
    __typename
    ... on MutationLoginSuccess {
      data {
        token
      }
    }
    ... on BaseError {
      message
    }
    ... on ZodError {
      message
    }
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;