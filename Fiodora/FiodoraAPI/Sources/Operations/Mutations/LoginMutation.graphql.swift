// @generated
// This file was automatically generated and should not be edited.

@_exported import ApolloAPI

public class LoginMutation: GraphQLMutation {
  public static let operationName: String = "Login"
  public static let operationDocument: ApolloAPI.OperationDocument = .init(
    definition: .init(
      #"mutation Login($input: MutationLoginInput!) { login(input: $input) { __typename ... on MutationLoginSuccess { __typename data { __typename token user { __typename createdAt email id name role updatedAt } } } ... on Error { __typename message } } }"#
    ))

  public var input: MutationLoginInput

  public init(input: MutationLoginInput) {
    self.input = input
  }

  public var __variables: Variables? { ["input": input] }

  public struct Data: FiodoraAPI.SelectionSet {
    public let __data: DataDict
    public init(_dataDict: DataDict) { __data = _dataDict }

    public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Objects.Mutation }
    public static var __selections: [ApolloAPI.Selection] { [
      .field("login", Login.self, arguments: ["input": .variable("input")]),
    ] }

    /// Login a user and return a token
    public var login: Login { __data["login"] }

    /// Login
    ///
    /// Parent Type: `MutationLoginResult`
    public struct Login: FiodoraAPI.SelectionSet {
      public let __data: DataDict
      public init(_dataDict: DataDict) { __data = _dataDict }

      public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Unions.MutationLoginResult }
      public static var __selections: [ApolloAPI.Selection] { [
        .field("__typename", String.self),
        .inlineFragment(AsMutationLoginSuccess.self),
        .inlineFragment(AsError_Interface.self),
      ] }

      public var asMutationLoginSuccess: AsMutationLoginSuccess? { _asInlineFragment() }
      public var asError_Interface: AsError_Interface? { _asInlineFragment() }

      /// Login.AsMutationLoginSuccess
      ///
      /// Parent Type: `MutationLoginSuccess`
      public struct AsMutationLoginSuccess: FiodoraAPI.InlineFragment {
        public let __data: DataDict
        public init(_dataDict: DataDict) { __data = _dataDict }

        public typealias RootEntityType = LoginMutation.Data.Login
        public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Objects.MutationLoginSuccess }
        public static var __selections: [ApolloAPI.Selection] { [
          .field("data", Data.self),
        ] }

        public var data: Data { __data["data"] }

        /// Login.AsMutationLoginSuccess.Data
        ///
        /// Parent Type: `AuthPayload`
        public struct Data: FiodoraAPI.SelectionSet {
          public let __data: DataDict
          public init(_dataDict: DataDict) { __data = _dataDict }

          public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Objects.AuthPayload }
          public static var __selections: [ApolloAPI.Selection] { [
            .field("__typename", String.self),
            .field("token", FiodoraAPI.ID.self),
            .field("user", User?.self),
          ] }

          /// Auth token
          public var token: FiodoraAPI.ID { __data["token"] }
          /// User entity
          public var user: User? { __data["user"] }

          /// Login.AsMutationLoginSuccess.Data.User
          ///
          /// Parent Type: `User`
          public struct User: FiodoraAPI.SelectionSet {
            public let __data: DataDict
            public init(_dataDict: DataDict) { __data = _dataDict }

            public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Objects.User }
            public static var __selections: [ApolloAPI.Selection] { [
              .field("__typename", String.self),
              .field("createdAt", FiodoraAPI.DateTime.self),
              .field("email", String.self),
              .field("id", FiodoraAPI.ID.self),
              .field("name", String.self),
              .field("role", String.self),
              .field("updatedAt", FiodoraAPI.DateTime?.self),
            ] }

            /// User creation date
            public var createdAt: FiodoraAPI.DateTime { __data["createdAt"] }
            /// User email
            public var email: String { __data["email"] }
            /// User UUID
            public var id: FiodoraAPI.ID { __data["id"] }
            /// User name
            public var name: String { __data["name"] }
            /// User role
            public var role: String { __data["role"] }
            public var updatedAt: FiodoraAPI.DateTime? { __data["updatedAt"] }
          }
        }
      }

      /// Login.AsError_Interface
      ///
      /// Parent Type: `Error_Interface`
      public struct AsError_Interface: FiodoraAPI.InlineFragment {
        public let __data: DataDict
        public init(_dataDict: DataDict) { __data = _dataDict }

        public typealias RootEntityType = LoginMutation.Data.Login
        public static var __parentType: ApolloAPI.ParentType { FiodoraAPI.Interfaces.Error_Interface }
        public static var __selections: [ApolloAPI.Selection] { [
          .field("message", String.self),
        ] }

        public var message: String { __data["message"] }
      }
    }
  }
}
