import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LiveChat } from '../components/Chat/LiveChat';
import { Heart, Users, Briefcase, Globe, ArrowRight, Calendar, Share2, MessageSquare, HandHeart, Building, School } from 'lucide-react';
export function JoinOurMission() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h1>
              <p className="text-xl mb-10">
                Be part of the global movement to ensure no child goes hungry. 
                Together, we can create sustainable solutions to childhood hunger through 
                community-driven action and innovative technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#ways-to-help" className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Explore Ways to Help
                </a>
                <Link to="/impact-stories" className="bg-teal-700 text-white border border-white px-6 py-3 rounded-md font-medium hover:bg-teal-800 transition-colors">
                  See Our Impact
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Ways to Help Section */}
        <section id="ways-to-help" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Ways to Join Our Mission</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
              There are many ways to contribute to NourishNet's mission, from donating and volunteering 
              to becoming a partner organization or advocate. Find the path that works best for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Donate Card */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                <div className="h-3 bg-teal-600"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Heart size={28} className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Become a Donor</h3>
                  <p className="text-gray-600 mb-6">
                    Support children in need by making direct donations that provide nutritious meals. 
                    Choose between one-time or recurring contributions, and see exactly how your 
                    donation makes an impact.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-teal-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Transparent tracking of your contribution</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-teal-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Direct connection with supported families</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-teal-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Regular updates on the impact made</span>
                    </li>
                  </ul>
                  <Link to="/become-donor" className="block text-center bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                    Become a Donor
                  </Link>
                </div>
              </div>
              {/* Volunteer Card */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                <div className="h-3 bg-blue-600"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Volunteer With Us</h3>
                  <p className="text-gray-600 mb-6">
                    Contribute your time and skills to help deliver meals, support food providers, 
                    coordinate local efforts, or assist with verification processes in your community.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Flexible scheduling options</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Various roles based on your skills</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Direct impact in your local community</span>
                    </li>
                  </ul>
                  <Link to="/volunteer-registration" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    Volunteer Now
                  </Link>
                </div>
              </div>
              {/* Partner Card */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                <div className="h-3 bg-purple-600"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase size={28} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Become a Partner</h3>
                  <p className="text-gray-600 mb-6">
                    Organizations can partner with NourishNet as food providers, logistics partners, 
                    corporate sponsors, or technology contributors to amplify our collective impact.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Corporate social responsibility opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Technology and service partnerships</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight size={18} className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Food provider network membership</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="block text-center bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors">
                    Partner With Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* More Ways to Help */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">More Ways to Make a Difference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe size={24} className="text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Spread Awareness</h3>
                <p className="text-gray-600 mb-4">
                  Share our mission on social media and help raise awareness about childhood hunger and our solutions.
                </p>
                <button className="text-amber-600 font-medium hover:text-amber-700 flex items-center justify-center mx-auto">
                  Share Now <Share2 size={16} className="ml-2" />
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Host an Event</h3>
                <p className="text-gray-600 mb-4">
                  Organize a fundraising event in your community to support NourishNet's programs.
                </p>
                <Link to="/contact" className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center mx-auto">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <School size={24} className="text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">School Programs</h3>
                <p className="text-gray-600 mb-4">
                  Implement NourishNet programs in your school to educate and involve students.
                </p>
                <Link to="/contact" className="text-rose-600 font-medium hover:text-rose-700 flex items-center justify-center mx-auto">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Advocate</h3>
                <p className="text-gray-600 mb-4">
                  Become an advocate for childhood nutrition and food security policies.
                </p>
                <Link to="/contact" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center justify-center mx-auto">
                  Join Advocacy <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Impact Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">The Impact We Make Together</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
              See how your contribution can make a real difference in the lives of children and communities worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Children receiving meals" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">50,000+ Children Fed</h3>
                  <p className="text-gray-600 mb-4">
                    With the help of our donors and volunteers, we've provided nutritious meals to over 50,000 children across 25 countries.
                  </p>
                  <Link to="/impact-stories" className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                    Read Success Stories <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Community kitchen" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">100+ Community Kitchens</h3>
                  <p className="text-gray-600 mb-4">
                    Our partners have established over 100 community kitchens that provide sustainable food support to local neighborhoods.
                  </p>
                  <Link to="/impact-stories" className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                    See Community Impact <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <img src="/pexels-rebecca-zaal-252062-764681.jpg" alt="School nutrition program" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">750+ Partner Schools</h3>
                  <p className="text-gray-600 mb-4">
                    Our school nutrition programs have improved attendance and academic performance in over 750 schools worldwide.
                  </p>
                  <Link to="/impact-stories" className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                    Learn About Programs <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-20 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">Why Others Joined Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white">
                    <HandHeart size={20} className="text-teal-600" />
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">
                    "Volunteering with NourishNet has been the most rewarding experience. Seeing the direct impact of my time on children's lives has changed my perspective on community service."
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Sarah K.</p>
                      <p className="text-sm text-gray-500">Volunteer, 2 years</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white">
                    <Heart size={20} className="text-teal-600" />
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">
                    "As a monthly donor, I appreciate the transparency of NourishNet. I can see exactly where my contribution goes and the children it helps. It's a level of accountability I haven't found elsewhere."
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Michael T.</p>
                      <p className="text-sm text-gray-500">Monthly Donor, 3 years</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white">
                    <Building size={20} className="text-teal-600" />
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">
                    "Partnering with NourishNet has allowed our restaurant to contribute excess food to those who need it most. Their technology makes the process seamless and efficient."
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Elena R.</p>
                      <p className="text-sm text-gray-500">Restaurant Owner, Partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 bg-teal-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto">
              Join thousands of donors, volunteers, and partners who are working together to create a world where no child goes hungry.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/become-donor" className="bg-white text-teal-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Donate Now
              </Link>
              <Link to="/volunteer-registration" className="bg-teal-800 text-white border border-teal-600 px-8 py-3 rounded-md font-medium hover:bg-teal-900 transition-colors">
                Volunteer
              </Link>
              <Link to="/contact" className="bg-transparent text-white border border-white px-8 py-3 rounded-md font-medium hover:bg-teal-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
        {/* Join Community Form Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Join Our Community</h2>
              <p className="text-gray-600 text-center mb-10">
                Sign up to receive updates about our mission, volunteer opportunities, and ways to get involved in your local area.
              </p>
              <div className="bg-gray-50 rounded-lg shadow-md p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
                      <input type="text" id="firstName" name="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
                      <input type="text" id="lastName" name="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                      <select id="country" name="country" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="FI">Finland</option>
                        <option value="IN">India</option>
                        <option value="NG">Nigeria</option>
                        <option value="BR">Brazil</option>
                        <option value="ZA">South Africa</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                      <input type="text" id="city" name="city" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="interests" className="block text-gray-700 mb-2">I'm interested in:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="donating" name="interests" value="donating" className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                        <label htmlFor="donating" className="ml-2 text-gray-700">Donating</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="volunteering" name="interests" value="volunteering" className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                        <label htmlFor="volunteering" className="ml-2 text-gray-700">Volunteering</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="partnerships" name="interests" value="partnerships" className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                        <label htmlFor="partnerships" className="ml-2 text-gray-700">Partnerships</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="events" name="interests" value="events" className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                        <label htmlFor="events" className="ml-2 text-gray-700">Community Events</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="newsletter" name="newsletter" type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="text-gray-600">
                        I'd like to receive the NourishNet newsletter with updates about impact and opportunities.
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                      Join Our Community
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat />
    </div>;
}