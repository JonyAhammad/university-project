import React, { Children } from 'react';
import { CheckCircle, Globe, Lock, Zap, DollarSign, HeartHandshake } from 'lucide-react';
export function Features() {
  return <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NourishNet is designed with transparency, efficiency, and security
            at its core, creating a trusted ecosystem for food support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<CheckCircle size={32} className="text-teal-600" />} title="Transparent Process" description="Track every step from request to delivery, ensuring accountability and trust in the system." />
          <FeatureCard icon={<Globe size={32} className="text-teal-600" />} title="Community Network" description="Connect local businesses, volunteers, and donors to create a sustainable support ecosystem." />
          <FeatureCard icon={<Lock size={32} className="text-teal-600" />} title="Privacy Protection" description="Children's identities remain anonymous, with requests made by trusted adults on their behalf." />
          <FeatureCard icon={<Zap size={32} className="text-teal-600" />} title="Efficient Fulfillment" description="Direct, on-demand food delivery system that responds quickly to specific needs." />
          <FeatureCard icon={<DollarSign size={32} className="text-teal-600" />} title="Direct Funding Model" description="100% of donations go directly to fulfilling food requests, with no platform commissions." />
          <FeatureCard icon={<HeartHandshake size={32} className="text-teal-600" />} title="Open Source" description="Built as a community resource that can be improved and adapted worldwide." />
        </div>
      </div>
    </section>;
}
function FeatureCard({
  icon,
  title,
  description
}) {
  return <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
}