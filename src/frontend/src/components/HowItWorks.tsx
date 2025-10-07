import React from 'react';
import { FileText, Search, Check, Utensils, Truck, ThumbsUp } from 'lucide-react';
export function HowItWorks() {
  return <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How NourishNet Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures children receive the food they need
            quickly and efficiently, while maintaining privacy and
            accountability.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute top-1/2 left-[50px] right-[50px] h-1 bg-teal-200 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProcessStep icon={<FileText size={32} className="text-white" />} title="Request Submission" description="A trusted adult submits a food request on behalf of a child, including time, location, and dietary needs." step={1} />
              <ProcessStep icon={<Search size={32} className="text-white" />} title="Donor & Provider Selection" description="A donor is assigned and selects suitable food providers in the region." step={2} />
              <ProcessStep icon={<Check size={32} className="text-white" />} title="Requester Confirmation" description="The requester reviews and selects the final provider from the options." step={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <ProcessStep icon={<Utensils size={32} className="text-white" />} title="Order Preparation" description="The selected provider prepares the food and uploads verification photos." step={4} />
              <ProcessStep icon={<Truck size={32} className="text-white" />} title="Food Delivery" description="The food is delivered to the specified location securely and on time." step={5} />
              <ProcessStep icon={<ThumbsUp size={32} className="text-white" />} title="Completion & Feedback" description="The requester confirms receipt and provides feedback. Payment is released to the provider." step={6} />
            </div>
          </div>
        </div>
      </div>
    </section>;
}
function ProcessStep({
  icon,
  title,
  description,
  step
}) {
  return <div className="flex flex-col items-center relative z-10">
      <div className="bg-teal-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {icon}
        <span className="sr-only">Step {step}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>;
}