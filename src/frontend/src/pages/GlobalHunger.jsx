import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AlertTriangle, Globe, TrendingUp, BarChart, Heart, MapPin, Info } from 'lucide-react';
export function GlobalHunger() {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-red-600 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle size={28} className="text-white mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                Global Childhood Hunger Crisis
              </h1>
            </div>
            <p className="text-red-100 text-center mt-2 max-w-3xl mx-auto">
              Understanding the scale and impact of childhood hunger around the world and how we can work together to solve it.
            </p>
          </div>
        </div>
        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">The Global Challenge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <Globe size={32} className="text-red-600" />
                </div>
                <h3 className="text-4xl font-bold text-red-700 mb-2">828M</h3>
                <p className="text-gray-700">People facing hunger worldwide</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertTriangle size={32} className="text-red-600" />
                </div>
                <h3 className="text-4xl font-bold text-red-700 mb-2">149M</h3>
                <p className="text-gray-700">Children with stunted growth due to malnutrition</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <TrendingUp size={32} className="text-red-600" />
                </div>
                <h3 className="text-4xl font-bold text-red-700 mb-2">45%</h3>
                <p className="text-gray-700">Of child deaths linked to undernutrition</p>
              </div>
            </div>
            <div className="mt-12 text-center text-gray-600">
              <p className="max-w-3xl mx-auto">
                Source: United Nations World Food Programme and UNICEF data, 2022
              </p>
            </div>
          </div>
        </section>
        {/* Regional Hotspots */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Regional Hunger Hotspots</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Childhood hunger affects every region of the world, but some areas face more severe challenges due to conflict, climate change, and economic instability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-red-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-red-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Sub-Saharan Africa</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{
                      width: '85%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>Critical (85%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Home to the highest rates of childhood hunger, with 1 in 3 children experiencing malnutrition. Drought, conflict, and poverty are major contributing factors.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>278 million people facing hunger</li>
                    <li>38% of children under 5 are stunted</li>
                    <li>High risk of famine in multiple countries</li>
                  </ul>
                  <div className="flex items-center text-red-600">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Urgent intervention needed</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-red-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">South Asia</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{
                      width: '70%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>Severe (70%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Despite economic growth, millions of children still suffer from malnutrition. Climate events and economic inequality exacerbate the situation.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>305 million people facing hunger</li>
                    <li>33% of world's malnourished children</li>
                    <li>Growing disparity between urban and rural areas</li>
                  </ul>
                  <div className="flex items-center text-red-500">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Sustained support required</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-orange-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-orange-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Middle East & North Africa</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{
                      width: '65%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>High (65%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Conflict and displacement have dramatically increased food insecurity. Children in Yemen, Syria, and parts of Iraq face acute malnutrition.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>69 million people facing hunger</li>
                    <li>15% increase in childhood malnutrition since 2015</li>
                    <li>Conflict remains the primary driver</li>
                  </ul>
                  <div className="flex items-center text-orange-500">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Conflict resolution critical</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-yellow-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-yellow-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Latin America & Caribbean</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '55%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>Moderate (55%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Economic crises and climate events have reversed progress on food security. Venezuela, Haiti, and parts of Central America face significant challenges.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>56 million people facing hunger</li>
                    <li>7.5% of children under 5 are malnourished</li>
                    <li>Increasing migration due to food insecurity</li>
                  </ul>
                  <div className="flex items-center text-yellow-500">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Economic support needed</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-yellow-400"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-yellow-400 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">East Asia & Pacific</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-400 h-2.5 rounded-full" style={{
                      width: '40%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>Concerning (40%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Progress has been made, but pockets of severe malnutrition persist in remote areas and among marginalized communities.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>85 million people facing hunger</li>
                    <li>Significant disparities between urban and rural areas</li>
                    <li>Climate change increasingly threatening food security</li>
                  </ul>
                  <div className="flex items-center text-yellow-500">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Targeted interventions required</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-4 bg-blue-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin size={24} className="text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800">Developed Regions</h3>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{
                      width: '25%'
                    }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>Severity</span>
                      <span>Present (25%)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Even in wealthy nations, food insecurity affects millions of children, particularly in underserved communities and during economic downturns.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mb-4">
                    <li>35 million people facing food insecurity</li>
                    <li>Growing income inequality exacerbates the problem</li>
                    <li>Food deserts in urban and rural areas</li>
                  </ul>
                  <div className="flex items-center text-blue-500">
                    <Info size={16} className="mr-2" />
                    <span className="text-sm font-medium">Policy reform needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Impact on Children */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Impact on Children</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Childhood hunger has far-reaching consequences that extend beyond immediate physical discomfort, affecting every aspect of a child's development and future potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Educational Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>66% lower school attendance rates among hungry children</li>
                  <li>Reduced cognitive development and learning capacity</li>
                  <li>Difficulty concentrating in class</li>
                  <li>Higher dropout rates, perpetuating cycles of poverty</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Health Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Weakened immune systems and increased vulnerability to disease</li>
                  <li>Stunted physical growth and development</li>
                  <li>Micronutrient deficiencies leading to lifelong health issues</li>
                  <li>Higher rates of chronic conditions in adulthood</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Psychological Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Increased stress, anxiety, and depression</li>
                  <li>Social stigma and feelings of shame</li>
                  <li>Behavioral issues and difficulty forming relationships</li>
                  <li>Long-term mental health consequences into adulthood</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Economic Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Estimated 2-3% GDP loss in affected countries</li>
                  <li>Reduced lifetime earnings and productivity</li>
                  <li>Increased healthcare costs for preventable conditions</li>
                  <li>Perpetuation of intergenerational poverty cycles</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Social Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Increased migration and displacement</li>
                  <li>Higher risk of child labor and exploitation</li>
                  <li>Potential for social unrest in severely affected areas</li>
                  <li>Weakened community resilience and cohesion</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Globe size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Global Impact</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Undermines progress on all Sustainable Development Goals</li>
                  <li>Contributes to global inequality and instability</li>
                  <li>Reduces human capital and innovation potential</li>
                  <li>Creates long-term humanitarian challenges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Solutions & How to Help */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Solutions & How You Can Help</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Solving childhood hunger requires coordinated efforts at all levels. Here's how NourishNet and supporters like you can make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <Heart size={24} className="mr-2" />
                  Immediate Solutions
                </h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Direct Food Support</h4>
                      <p className="text-gray-600 text-sm">
                        Providing immediate meals and nutrition to children in crisis situations through our verified partners.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">School Feeding Programs</h4>
                      <p className="text-gray-600 text-sm">
                        Implementing sustainable meal programs in schools to improve attendance and learning outcomes.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Nutrition Supplements</h4>
                      <p className="text-gray-600 text-sm">
                        Distributing essential vitamins and supplements to combat micronutrient deficiencies.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Community Kitchens</h4>
                      <p className="text-gray-600 text-sm">
                        Supporting local kitchens that provide nutritious meals to children and families in need.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <Globe size={24} className="mr-2" />
                  Long-term Solutions
                </h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Agricultural Training</h4>
                      <p className="text-gray-600 text-sm">
                        Teaching sustainable farming techniques to communities to improve food security.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Nutrition Education</h4>
                      <p className="text-gray-600 text-sm">
                        Providing knowledge about balanced diets and optimal child nutrition to families and caregivers.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Economic Empowerment</h4>
                      <p className="text-gray-600 text-sm">
                        Supporting parents and communities with skills training and income-generating opportunities.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                      <span className="text-teal-600 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Advocacy & Policy Change</h4>
                      <p className="text-gray-600 text-sm">
                        Working with governments and organizations to implement effective anti-hunger policies.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">How You Can Make a Difference</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={24} className="text-teal-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Become a Donor</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Support our efforts with one-time or recurring donations that directly fund food programs for children.
                  </p>
                  <a href="/become-donor" className="inline-block bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors">
                    Donate Now
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-teal-600" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Volunteer</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Join our global network of volunteers who help distribute food, teach nutrition, and support communities.
                  </p>
                  <a href="/contact" className="inline-block bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors">
                    Get Involved
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Spread Awareness</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Share information about childhood hunger and our solutions with your network to expand our reach.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </button>
                    <button className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                    </button>
                    <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="py-16 bg-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Take Action Today</h2>
            <p className="text-red-100 max-w-3xl mx-auto mb-8">
              Every child deserves to grow up healthy, strong, and well-nourished. Join us in our mission to end childhood hunger worldwide.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="/become-donor" className="bg-white text-red-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Donate Now
              </a>
              <a href="/track-donation" className="bg-red-800 text-white px-8 py-3 rounded-md font-medium hover:bg-red-900 transition-colors">
                Track Your Impact
              </a>
              <a href="/verification-center" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors">
                Get Verified
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}