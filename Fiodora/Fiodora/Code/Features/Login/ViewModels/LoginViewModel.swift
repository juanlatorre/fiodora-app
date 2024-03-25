//
//  LoginViewModel.swift
//  Fiodora
//
//  Created by Juan Latorre on 24-03-24.
//

import Foundation
import FiodoraAPI
import SwiftUI
import KeychainSwift

class LoginViewModel: ObservableObject {
    @Published var isSubmitEnabled: Bool = true
    @Published var isLoading: Bool = false
    @Published var errorText: String?
    @Published var appAlert: AppAlert?
    
    func login(with email: String?, with password: String?) {
        errorText = nil
        isSubmitEnabled = false
        isLoading = true
        
        guard let email = email, !email.isEmpty else {
            errorText = "Please enter an email address."
            isSubmitEnabled = true
            isLoading = false
            return
        }
        
        guard let password = password, !password.isEmpty else {
            errorText = "Please enter a password."
            isSubmitEnabled = true
            isLoading = false
            return
        }
        
        guard validate(email: email) else {
            errorText = "Please enter a valid email"
            isSubmitEnabled = true
            isLoading = false
            return
       }
        
        Network.shared.apollo.perform(mutation: LoginMutation(input: MutationLoginInput(email: email, password: password))) { [weak self] result in
            defer {
                self?.isSubmitEnabled = true
                self?.isLoading = false
            }
            
            switch result {
            case .success(let graphQLResult):
                if let token = graphQLResult.data?.login.asMutationLoginSuccess?.data.token {
                    let keychain = KeychainSwift()
                    keychain.set(token, forKey: LoginView.loginKeychainKey)
                }
                
                if let errors = graphQLResult.errors {
                    self?.appAlert = .errors(errors: errors)
                }
            case .failure(let error):
                self?.appAlert = .errors(errors: [error])
            }
        }
    }
    
    private func validate(email: String) -> Bool {
        var isValid = true
        let emailRegex = #"^\S+@\S+\.\S+$"#
        
        do {
            let regex = try NSRegularExpression(pattern: emailRegex)
            let nsString = email as NSString
            let results = regex.matches(in: email, range: NSRange(location: 0, length: nsString.length))
            
            if (results.count == 0) {
                isValid = false
            }
        } catch let error as NSError {
            print("invalid regex: \(error.localizedDescription)")
            isValid = false
        }
        
        return isValid
    }
}
