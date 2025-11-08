import React, { useEffect, useRef, Children } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LiveChat } from '../components/Chat/LiveChat';
import { Linkedin, Twitter, Github, Globe, Mail, Heart, MapPin, Calendar, Users } from 'lucide-react';
import { foundersData } from '../utils/searchUtils';
export function AboutUs() {
  const location = useLocation();
  const foundersRef = useRef([]);
  // Scroll to highlighted founder if coming from search
  useEffect(() => {
    if (location.state?.highlightFounderId) {
      const index = foundersData.findIndex(founder => founder.id === location.state.highlightFounderId);
      if (index !== -1 && foundersRef.current[index]) {
        foundersRef.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        // Add highlight animation
        foundersRef.current[index].classList.add('highlight-animation');
        // Remove animation class after animation completes
        setTimeout(() => {
          if (foundersRef.current[index]) {
            foundersRef.current[index].classList.remove('highlight-animation');
          }
        }, 2000);
      }
    }
  }, [location.state]);
  // Add founders to ref array
  const addToFoundersRef = (el, index) => {
    if (el && !foundersRef.current.includes(el)) {
      foundersRef.current[index] = el;
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-teal-600 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              About NourishNet
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Our mission is to create a world where no child goes hungry, by
              connecting communities and resources through innovative
              technology.
            </p>
          </div>
        </div>
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Our Mission & Vision
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-10">
                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 mb-6">
                  NourishNet's mission is to create a transparent and efficient
                  global platform that connects children in need with food
                  providers and donors, ensuring that every child has access to
                  nutritious meals regardless of their circumstances.
                </p>
                <h3 className="text-xl font-semibold text-teal-700 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  We envision a world where childhood hunger is eliminated
                  through community-driven support networks, powered by
                  transparent technology that builds trust and enables direct
                  connections between those who can help and those in need.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-teal-600 text-2xl font-bold mb-2">
                    100+
                  </div>
                  <div className="text-gray-800 font-medium">
                    Communities Served
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-teal-600 text-2xl font-bold mb-2">
                    50,000+
                  </div>
                  <div className="text-gray-800 font-medium">
                    Children Supported
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="text-teal-600 text-2xl font-bold mb-2">
                    25
                  </div>
                  <div className="text-gray-800 font-medium">
                    Countries Reached
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Founders Section */}
        <section className="py-16 bg-gray-50" id="founders">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
              Our Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {foundersData.map((founder, index) => <div key={founder.id} ref={el => addToFoundersRef(el, index)} className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${location.state?.highlightFounderId === founder.id ? 'ring-2 ring-teal-500' : ''}`}>
                  <div className="h-64 overflow-hidden">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-teal-600 font-medium mb-4">
                      {founder.role}
                    </p>
                    <p className="text-gray-600 mb-4">{founder.bio}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Areas of Expertise:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill, i) => <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>)}
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      {founder.socialLinks.linkedin && <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors">
                          <Linkedin size={18} />
                          <span className="sr-only">LinkedIn</span>
                        </a>}
                      {founder.socialLinks.twitter && <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors">
                          <Twitter size={18} />
                          <span className="sr-only">Twitter</span>
                        </a>}
                      {founder.socialLinks.github && <a href={founder.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors">
                          <Github size={18} />
                          <span className="sr-only">GitHub</span>
                        </a>}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Our Story
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center md:items-end">
                    <div className="bg-teal-100 p-2 rounded-full mb-2">
                      <Calendar size={24} className="text-teal-700" />
                    </div>
                    <p className="font-semibold text-teal-700">2019</p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      The Beginning
                    </h3>
                    <p className="text-gray-700">
                      Our founders met while working on humanitarian projects
                      across different continents. Witnessing firsthand the
                      inefficiencies in food aid distribution, they envisioned a
                      platform that could directly connect donors with children
                      in need.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center md:items-end">
                    <div className="bg-teal-100 p-2 rounded-full mb-2">
                      <Globe size={24} className="text-teal-700" />
                    </div>
                    <p className="font-semibold text-teal-700">2020</p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Platform Launch
                    </h3>
                    <p className="text-gray-700">
                      NourishNet launched as a pilot program in three countries,
                      focusing on creating a transparent system where donors
                      could see exactly how their contributions were helping
                      children access nutritious meals.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center md:items-end">
                    <div className="bg-teal-100 p-2 rounded-full mb-2">
                      <Users size={24} className="text-teal-700" />
                    </div>
                    <p className="font-semibold text-teal-700">2021-2022</p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Global Expansion
                    </h3>
                    <p className="text-gray-700">
                      Following initial success, NourishNet expanded to 15 more
                      countries, building local partnerships with food providers
                      and establishing community verification networks to ensure
                      support reached those who needed it most.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center md:items-end">
                    <div className="bg-teal-100 p-2 rounded-full mb-2">
                      <Heart size={24} className="text-teal-700" />
                    </div>
                    <p className="font-semibold text-teal-700">Present</p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Building for the Future
                    </h3>
                    <p className="text-gray-700">
                      Today, NourishNet continues to innovate with new features
                      like local support networks, real-time donation tracking,
                      and community-driven verification systems. Our goal is to
                      create sustainable food support ecosystems in every
                      community we serve.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Join Us Section */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Join Our Mission
              </h2>
              <p className="text-gray-700 mb-8">
                Whether you're looking to donate, volunteer, or partner with us,
                there are many ways to contribute to the NourishNet mission.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/become-donor" className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                  Become a Donor
                </a>
                <a href="/volunteer-registration" className="bg-white text-teal-700 border border-teal-600 px-6 py-3 rounded-md font-medium hover:bg-teal-50 transition-colors">
                  Volunteer With Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LiveChat />
      <style jsx="true">{`
        .highlight-animation {
          animation: highlight-pulse 2s ease-in-out;
        }
        @keyframes highlight-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(20, 184, 166, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
          }
        }
      `}</style>
    </div>;
}