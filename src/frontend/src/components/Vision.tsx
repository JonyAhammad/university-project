import React from 'react';
import { Link } from 'react-router-dom';
export function Vision() {
  return <section id="vision" className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600">
              Creating a world where no child goes hungry, powered by community
              action and innovative technology.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-teal-700 mb-6">
              Community-Driven Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Local Support Network
                </h4>
                <p className="text-gray-700 mb-4">
                  Our platform connects local donors directly with families in
                  need, creating a sustainable support system within
                  communities. By facilitating these connections, we enable
                  immediate assistance and build lasting relationships.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Direct donor-to-family connections</li>
                  <li>Immediate local response to urgent needs</li>
                  <li>Community-based verification system</li>
                  <li>Sustainable long-term support relationships</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Global Reach, Local Impact
                </h4>
                <p className="text-gray-700 mb-4">
                  While our platform operates globally, our focus is on creating
                  meaningful local impact. We believe that the most effective
                  support comes from within communities, with global resources
                  amplifying local efforts.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Technology-enabled local matching</li>
                  <li>Cultural sensitivity in support delivery</li>
                  <li>Knowledge sharing across communities</li>
                  <li>Building resilient local support networks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 mb-6">
              NourishNet will be an open-source platform, continuously improved
              by developers worldwide to create lasting social impact.
            </p>
            <Link to="/join-our-mission" className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors text-lg">
              Join Our Mission
            </Link>
          </div>
        </div>
      </div>
    </section>;
}