//
//  LoginButtonView.swift
//  Fiodora
//
//  Created by Juan Latorre on 25-03-24.
//

import SwiftUI

struct LoginButtonView: View {
    @Binding var isLoading: Bool
    var action: () -> Void
    
    private var label: String {
        let loadingLabel: String = String(localized: "Submitting...", comment: "Loading sign in button")
        let staleLabel: String = String(localized: "Sign In", comment: "Sign in button")
        
        return isLoading ? loadingLabel : staleLabel
    }
    
    var body: some View {
        Button(action: action) {
            Text(label)
               .fontWeight(.heavy)
               .font(.title3)
               .frame(maxWidth: .infinity)
               .padding()
               .foregroundColor(.white)
               .background(LinearGradient(gradient: Gradient(colors: [.pink, .purple]), startPoint: .leading, endPoint: .trailing))
               .cornerRadius(40)
        }
    }
}

#Preview {
    func action() -> Void {
        return
    }
    
    return LoginButtonView(isLoading: .constant(false), action: action)
}
