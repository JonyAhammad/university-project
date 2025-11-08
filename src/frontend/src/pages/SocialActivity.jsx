import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Users, Award, Heart, Clock } from 'lucide-react';
export function SocialActivity() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Our Social Impact
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              See how NourishNet is making a difference in children's lives around the world through our community-driven initiatives.
            </p>
          </div>
        </div>
        {/* Impact Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Global Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-teal-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Users size={32} className="text-teal-600" />
                </div>
                <h3 className="text-4xl font-bold text-teal-700 mb-2">50K+</h3>
                <p className="text-gray-700">Children Supported</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <MapPin size={32} className="text-teal-600" />
                </div>
                <h3 className="text-4xl font-bold text-teal-700 mb-2">35</h3>
                <p className="text-gray-700">Countries Reached</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Award size={32} className="text-teal-600" />
                </div>
                <h3 className="text-4xl font-bold text-teal-700 mb-2">750+</h3>
                <p className="text-gray-700">Partner Organizations</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Heart size={32} className="text-teal-600" />
                </div>
                <h3 className="text-4xl font-bold text-teal-700 mb-2">1.2M</h3>
                <p className="text-gray-700">Meals Delivered</p>
              </div>
            </div>
          </div>
        </section>
        {/* Recent Activities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Recent Activities</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Explore our recent initiatives and see how we're making a difference in communities worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="/pexels-naomi-shi-374023-1001914.jpg" alt="Children eating nutritious meal" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>June 15, 2023</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span>East Africa</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">School Nutrition Program Launch</h3>
                  <p className="text-gray-600 mb-4">
                    Launched a comprehensive nutrition program across 25 schools in East Africa, providing daily meals to over 5,000 children.
                  </p>
                  <div className="flex items-center text-teal-600">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">5,000+ children impacted</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="/pexels-rebecca-zaal-252062-764681.jpg" alt="Children in classroom" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>May 3, 2023</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span>South Asia</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Kitchen Initiative</h3>
                  <p className="text-gray-600 mb-4">
                    Established 10 community kitchens in rural areas of South Asia, providing nutritious meals and culinary training.
                  </p>
                  <div className="flex items-center text-teal-600">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">3,200+ children impacted</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Volunteers distributing food packages" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>April 22, 2023</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span>Latin America</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Food Relief</h3>
                  <p className="text-gray-600 mb-4">
                    Coordinated rapid response food distribution in areas affected by severe flooding, reaching vulnerable children and families.
                  </p>
                  <div className="flex items-center text-teal-600">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">8,500+ children impacted</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                View More Activities
              </button>
            </div>
          </div>
        </section>
        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Upcoming Events</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Join us in our upcoming initiatives and be part of the movement to combat childhood hunger.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 flex">
                <div className="bg-teal-600 text-white rounded-lg p-4 text-center mr-6 flex-shrink-0 w-20">
                  <span className="block text-2xl font-bold">15</span>
                  <span className="block text-sm">JUL</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Volunteer Day</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">9:00 AM - 5:00 PM</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span className="text-sm">Multiple Locations</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join thousands of volunteers worldwide as we coordinate a global day of action to pack and distribute meals to children in need.
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700">
                    Learn More →
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex">
                <div className="bg-teal-600 text-white rounded-lg p-4 text-center mr-6 flex-shrink-0 w-20">
                  <span className="block text-2xl font-bold">28</span>
                  <span className="block text-sm">JUL</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Education Workshop</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">2:00 PM - 4:00 PM</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span className="text-sm">Virtual Event</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn about childhood nutrition and how to create balanced meals for children with limited resources. Open to all caregivers and educators.
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700">
                    Register Now →
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex">
                <div className="bg-teal-600 text-white rounded-lg p-4 text-center mr-6 flex-shrink-0 w-20">
                  <span className="block text-2xl font-bold">10</span>
                  <span className="block text-sm">AUG</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Fundraising Gala Dinner</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">7:00 PM - 10:00 PM</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span className="text-sm">New York City</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join us for an elegant evening of fundraising to support our global initiatives. All proceeds go directly to food programs.
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700">
                    Purchase Tickets →
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex">
                <div className="bg-teal-600 text-white rounded-lg p-4 text-center mr-6 flex-shrink-0 w-20">
                  <span className="block text-2xl font-bold">22</span>
                  <span className="block text-sm">AUG</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">School Partnership Launch</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">10:00 AM - 12:00 PM</span>
                    <MapPin size={16} className="ml-4 mr-2" />
                    <span className="text-sm">Nairobi, Kenya</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Witness the launch of our new school partnership program bringing sustainable food solutions to 50 schools in East Africa.
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Success Stories */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Success Stories</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Real stories of how NourishNet is changing lives and communities around the world.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                    <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="Hope Elementary School" className="rounded-lg w-full h-auto" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hope Elementary School</h3>
                    <p className="text-gray-500 mb-4">Rural Community, Ethiopia</p>
                    <p className="text-gray-600 mb-4">
                      "Before NourishNet's program, many of our students would come to school hungry, unable to focus on learning. Now, with daily nutritious meals, attendance has increased by 35%, and academic performance has significantly improved. Parents are more engaged, and the entire community has been uplifted."
                    </p>
                    <p className="text-gray-700 font-medium">— Abeba Tadesse, School Principal</p>
                  </div>
                </div>
              </div>
              <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Children's Village" className="rounded-lg w-full h-auto" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Children's Village</h3>
                    <p className="text-gray-500 mb-4">Urban Center, Colombia</p>
                    <p className="text-gray-600 mb-4">
                      "The transparent donation system has transformed how we operate. We now receive consistent support that allows us to plan long-term. The children not only receive nutritious food but also learn about healthy eating habits that will serve them throughout life."
                    </p>
                    <p className="text-gray-700 font-medium">— Maria Gonzalez, Program Director</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                    <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="New Beginnings Shelter" className="rounded-lg w-full h-auto" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">New Beginnings Shelter</h3>
                    <p className="text-gray-500 mb-4">Coastal Region, Bangladesh</p>
                    <p className="text-gray-600 mb-4">
                      "After the devastating cyclone, many children were left without access to food. NourishNet's emergency response system quickly connected us with donors worldwide. Within 48 hours, we were able to provide meals to over 500 displaced children."
                    </p>
                    <p className="text-gray-700 font-medium">— Rahman Ali, Shelter Coordinator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Global Movement</h2>
            <p className="text-teal-100 max-w-3xl mx-auto mb-8">
              Whether you're a potential donor, volunteer, or organization in need, be part of our mission to ensure no child goes hungry.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="/become-donor" className="bg-white text-teal-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Become a Donor
              </a>
              <a href="/request-support" className="bg-teal-800 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-900 transition-colors">
                Request Support
              </a>
              <a href="/verification-center" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                Get Verified
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}