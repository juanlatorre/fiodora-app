//
//  LoginView.swift
//  Fiodora
//
//  Created by Juan Latorre on 24-03-24.
//

import SwiftUI

struct LoginView: View {
    static let loginKeychainKey = "login"
    
    @State private var email: String = ""
    @State private var password: String = ""
    
    @StateObject var viewModel: LoginViewModel
    
    init() {
        _viewModel = StateObject(wrappedValue: LoginViewModel())
    }
    
    private func loginAction() -> Void {
        viewModel.login(with: email, with: password)
    }
    
    var body: some View {
        HStack(alignment: .top) {
            VStack {
                Text("Welcome Back", comment: "The title of the Login View")
                    .font(.largeTitle)
                    .fontWeight(.black)
                    .padding(.bottom, 42)
                
                VStack {
                    InputField(data: $email, title: String(localized: "Email", comment: "Email input label"))
                        .autocapitalization(.none)
                        .disableAutocorrection(true)
                    InputField(data: $password, title: String(localized: "Password", comment: "Password input label"))
                        .autocapitalization(.none)
                        .disableAutocorrection(true)
                    
                }.padding(.bottom, 16)
                
                LoginButtonView(isLoading: $viewModel.isLoading, action: loginAction)
                    .disabled(!viewModel.isSubmitEnabled || viewModel.isLoading)
            }
            .padding()
        }
        .appAlert($viewModel.appAlert)
    }
}

#Preview {
    LoginView()
}
