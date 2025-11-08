import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SignIn as SignInForm } from '../components/Auth/SignIn';
export function SignIn() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>;
}