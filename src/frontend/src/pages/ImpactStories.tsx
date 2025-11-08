import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart, Share2, MessageSquare, Image, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
export function ImpactStories() {
  const [activeCategory, setActiveCategory] = useState('all');
  // Mock impact stories data
  const stories = [{
    id: 1,
    title: 'School Meals Changed Our Lives',
    family: 'The Rodriguez Family',
    location: 'Madrid, Spain',
    date: 'November 2, 2023',
    categories: ['education', 'food'],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "After losing my job, I was struggling to provide regular meals for my three children. NourishNet connected us with a local school meal program that ensures my kids get nutritious food every day. This has improved their concentration in class, and I've seen their grades improve significantly.",
    likes: 128,
    comments: 24
  }, {
    id: 2,
    title: 'Finding Community Through Food',
    family: 'The Patel Family',
    location: 'Helsinki, Finland',
    date: 'October 15, 2023',
    categories: ['community', 'food'],
    image: 'https://images.unsplash.com/photo-1536746953245-9f8853cfb3cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "When we moved to Finland, we felt isolated and struggled to adapt. Through NourishNet's community kitchen program, we not only received food support but also connected with other families in similar situations. Our children have made friends, and we're learning Finnish cooking alongside traditional recipes from around the world.",
    likes: 95,
    comments: 18
  }, {
    id: 3,
    title: 'Medical Support When We Needed It Most',
    family: 'The Okafor Family',
    location: 'Lagos, Nigeria',
    date: 'September 28, 2023',
    categories: ['medical', 'emergency'],
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "My youngest son needed urgent medication that we couldn't afford. Within hours of reaching out to NourishNet, a donor had covered the costs and a volunteer delivered the medicine to our door. This quick response prevented his condition from worsening and possibly saved his life.",
    likes: 213,
    comments: 47
  }, {
    id: 4,
    title: 'From Recipient to Volunteer',
    family: 'The Kim Family',
    location: 'Seoul, South Korea',
    date: 'August 12, 2023',
    categories: ['volunteer', 'community'],
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "After receiving support during a difficult time last year, I wanted to give back. Now I volunteer as a delivery person for NourishNet, bringing meals to families in need. My children join me sometimes, and it's teaching them valuable lessons about community and compassion.",
    likes: 167,
    comments: 31
  }, {
    id: 5,
    title: 'Nutrition Education Changed Our Health',
    family: 'The Müller Family',
    location: 'Berlin, Germany',
    date: 'July 24, 2023',
    categories: ['education', 'health'],
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "Along with food support, we received nutrition education through NourishNet's partner program. Learning how to prepare balanced meals on a budget has transformed our family's health. My daughter's persistent skin issues have cleared up, and we all have more energy throughout the day.",
    likes: 89,
    comments: 15
  }, {
    id: 6,
    title: 'Emergency Support During Flooding',
    family: 'The Garcia Family',
    location: 'Bogotá, Colombia',
    date: 'June 8, 2023',
    categories: ['emergency', 'community'],
    image: 'https://images.unsplash.com/photo-1603138461420-e24168721842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    content: "When floods hit our neighborhood, we lost everything. NourishNet's emergency response team provided immediate food, clean water, and temporary shelter for our family. The ongoing support helped us rebuild our lives in the months that followed.",
    likes: 178,
    comments: 42
  }];
  // Filter stories by category
  const filteredStories = activeCategory === 'all' ? stories : stories.filter(story => story.categories.includes(activeCategory));
  // Featured story (first in the list)
  const featuredStory = stories[0];
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Impact Stories
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Real stories from families whose lives have been changed through
              the NourishNet community. See the direct impact of your support
              and contributions.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          {/* Featured Story */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Featured Story
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img src={featuredStory.image} alt={featuredStory.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Globe size={14} className="mr-1" />
                    <span>{featuredStory.location}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredStory.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {featuredStory.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{featuredStory.content}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="font-medium">Shared by:</span>
                    <span className="ml-1">{featuredStory.family}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center text-gray-600 hover:text-teal-600">
                      <Heart size={18} className="mr-1" />
                      <span>{featuredStory.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-teal-600">
                      <MessageSquare size={18} className="mr-1" />
                      <span>{featuredStory.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-teal-600">
                      <Share2 size={18} className="mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Story Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                All Stories
              </button>
              <button onClick={() => setActiveCategory('food')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'food' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Food Support
              </button>
              <button onClick={() => setActiveCategory('medical')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'medical' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Medical Aid
              </button>
              <button onClick={() => setActiveCategory('education')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'education' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Education
              </button>
              <button onClick={() => setActiveCategory('emergency')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'emergency' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Emergency Response
              </button>
              <button onClick={() => setActiveCategory('community')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'community' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Community Building
              </button>
              <button onClick={() => setActiveCategory('volunteer')} className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'volunteer' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Volunteer Stories
              </button>
            </div>
          </div>
          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredStories.slice(1).map(story => <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {story.categories.map(category => <span key={category} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {story.content}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Globe size={12} className="mr-1" />
                    <span>{story.location}</span>
                    <span className="mx-2">•</span>
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center text-gray-600 hover:text-teal-600">
                        <Heart size={16} className="mr-1" />
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-teal-600">
                        <MessageSquare size={16} className="mr-1" />
                        <span>{story.comments}</span>
                      </button>
                    </div>
                    <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
                      Read More
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          {/* Pagination */}
          <div className="flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronLeft size={16} />
                <span className="sr-only">Previous</span>
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-teal-600 hover:bg-gray-50">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronRight size={16} />
                <span className="sr-only">Next</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Share Your Story Section */}
        <div className="bg-teal-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Share Your Story
              </h2>
              <p className="text-gray-600 mb-8">
                Has NourishNet made a difference in your family's life? Share
                your experience to inspire others and help us improve our
                services. Your story matters!
              </p>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center mx-auto">
                <Image size={18} className="mr-2" />
                Submit Your Story
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}