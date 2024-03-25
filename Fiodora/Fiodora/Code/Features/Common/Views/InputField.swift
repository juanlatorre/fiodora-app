//
//  InputField.swift
//  Fiodora
//
//  Created by Juan Latorre on 24-03-24.
//

import SwiftUI

struct InputField: View {
    @Binding var data: String
    var title: String?
    
    var body: some View {
        ZStack {
            TextField("", text: $data)
                .padding(.horizontal, 10)
                .frame(height: 42)
                .overlay(
                    RoundedRectangle(cornerSize: CGSize(width: 4, height: 4))
                        .stroke(Color.gray, lineWidth: 1)
            )
            
            HStack {
                Text(title ?? "Input")
                    .font(.headline)
                    .fontWeight(.thin)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.leading)
                    .padding(4)
                    .background(.white)
                Spacer()
            }
            .padding(.leading, 8)
            .offset(CGSize(width: 0, height: -20))
        }
        .padding(4)
    }
}

#Preview {
    @State var data: String = ""
    return InputField(data: $data, title: "Password")
}
