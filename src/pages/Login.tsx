
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4.5C16 5.88071 14.8807 7 13.5 7C12.1193 7 11 5.88071 11 4.5C11 3.11929 12.1193 2 13.5 2C14.8807 2 16 3.11929 16 4.5Z" fill="#9b87f5"/>
                <path d="M9 6L9 19M9 19H7M9 19H12M14 16L17 22L22 15" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L3 9L6 12" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal">
                TagAlong
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your TagAlong account</p>
        </div>

        <div className="bg-tagalong-purple/5 p-4 rounded-xl mb-6 flex items-start">
          <div className="bg-tagalong-purple/10 p-2 rounded-lg mr-3 mt-0.5">
            <Lock className="w-5 h-5 text-tagalong-purple" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-800">Secure sign in</p>
            <p className="text-gray-600">Your information is securely encrypted and protected</p>
          </div>
        </div>

        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none p-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "rounded-xl border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2",
              socialButtonsBlockButtonText: "flex-1",
              formButtonPrimary: "bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full py-3",
              footerActionLink: "text-tagalong-purple hover:text-tagalong-purple-dark",
              formFieldInput: "rounded-xl border-gray-300 focus:border-tagalong-purple focus:ring-tagalong-purple py-3",
              formFieldLabel: "font-medium text-gray-700",
              formFieldLabelRow: "mb-1.5",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton: "text-tagalong-purple hover:text-tagalong-purple-dark",
              formFieldAction: "text-tagalong-purple hover:text-tagalong-purple-dark",
              formHeaderTitle: "text-xl font-bold text-gray-800",
              formHeaderSubtitle: "text-gray-600",
              alertText: "text-gray-800",
              socialButtonsIconButton: "border border-gray-200 hover:bg-gray-50",
              socialButtonsProviderIcon: "w-5 h-5",
              formFieldInputShowPasswordButton: "text-gray-500",
              formResendCodeLink: "text-tagalong-purple hover:text-tagalong-purple-dark",
            }
          }}
        />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-tagalong-purple hover:underline font-medium">
              Sign up <ArrowRight className="inline w-4 h-4 ml-0.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
