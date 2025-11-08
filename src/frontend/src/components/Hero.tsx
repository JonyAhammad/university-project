import React from 'react';
import { Heart, Users, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Hero() {
  return <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting Communities to Combat Childhood Hunger
          </h1>
          <p className="text-xl mb-8">
            NourishNet is a transparent global platform that bridges the gap
            between children in need and those who can help, creating a direct
            and efficient food support system worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/request-support" className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Request Food Support
            </Link>
            <Link to="/become-donor" className="bg-teal-800 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-900 transition-colors">
              Become a Donor
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-4">
                <Heart size={28} className="text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Impact</h3>
              <p className="text-teal-100">
                See exactly how your contribution helps a child in need
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-4">
                <Users size={28} className="text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-teal-100">
                Powered by local volunteers and businesses worldwide
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-4">
                <Globe size={28} className="text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-teal-100">
                Connecting children in need with donors from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}