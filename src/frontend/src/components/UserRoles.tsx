import React from 'react';
import { UserCheck, ChefHat, Heart, ShieldCheck, Truck } from 'lucide-react';
export function UserRoles() {
  return <section id="roles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">User Roles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NourishNet brings together five key roles to create a seamless
            support network for children in need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <RoleCard icon={<UserCheck size={40} className="text-teal-600" />} title="Requester" description="A trusted adult who submits food requests on behalf of children in need, ensuring their privacy while advocating for their requirements." />
          <RoleCard icon={<ChefHat size={40} className="text-teal-600" />} title="Food Provider" description="Individuals or businesses who prepare and deliver quality meals to fulfill requests, creating a direct impact in their community." />
          <RoleCard icon={<Heart size={40} className="text-teal-600" />} title="Donor" description="Contributors who fund food requests and can track exactly how their donations are used, creating transparency in charitable giving." />
          <RoleCard icon={<Truck size={40} className="text-teal-600" />} title="Volunteer" description="Community members who donate their time to deliver meals, assist food providers, or help coordinate local support activities." />
          <RoleCard icon={<ShieldCheck size={40} className="text-teal-600" />} title="Administrator" description="Platform managers who ensure system integrity, verify users, and maintain the security and efficiency of the entire ecosystem." />
        </div>
      </div>
    </section>;
}
function RoleCard({
  icon,
  title,
  description
}) {
  return <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
}