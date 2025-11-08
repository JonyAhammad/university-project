import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SignUp as SignUpForm } from '../components/Auth/SignUp';
export function SignUp() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>;
}