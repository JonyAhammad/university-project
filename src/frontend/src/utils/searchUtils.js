// This utility provides search functionality across the entire application
// Content categories for search results
export const SEARCH_CATEGORIES = {
  FOUNDERS: 'founders',
  PAGES: 'pages',
  SUPPORT_SERVICES: 'support_services',
  LOCATIONS: 'locations',
  DONORS: 'donors',
  FAMILIES: 'families'
};
// Founder profiles data
export const foundersData = [{
  id: 1,
  name: 'JONY AHAMMAD',
  role: 'Co-Founder & CEO',
  bio: 'JONY AHAMMAD is a student of IT at Centria University of Applied Sciences studying software engineering. His passion for technology and humanitarian aid inspired the creation of NourishNet, a platform that directly connects those in need with resources.',
  image: "/pasted-image.jpg",
  expertise: ['Software Engineering', 'IT Solutions', 'Humanitarian Technology'],
  education: 'Centria University of Applied Sciences',
  socialLinks: {
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/'
  }
}, {
  id: 2,
  name: 'Muditha Kumara',
  role: 'Co-Founder & CTO',
  bio: 'Muditha Kumara leads technology development at NourishNet, leveraging his background in software engineering and distributed systems to create a scalable platform that works even in low-connectivity environments.',
  image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  expertise: ['Software Architecture', 'Mobile Development', 'Data Security'],
  socialLinks: {
    linkedin: 'https://linkedin.com/',
    github: 'https://github.com/'
  }
}, {
  id: 3,
  name: 'Tahbir Moon',
  role: 'Co-Founder & COO',
  bio: 'Tahbir Moon oversees global operations at NourishNet, with extensive experience in logistics and supply chain management. He has established partnerships with food providers across multiple continents to ensure reliable support delivery.',
  image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  expertise: ['Operations', 'Supply Chain', 'Strategic Partnerships'],
  socialLinks: {
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/'
  }
}];
// Pages data for search
const pagesData = [{
  id: 'home',
  title: 'Home',
  description: 'NourishNet homepage with overview of our mission and services',
  path: '/',
  keywords: ['home', 'main', 'landing', 'overview', 'mission']
}, {
  id: 'request-support',
  title: 'Request Support',
  description: 'Submit a request for food support for children in need',
  path: '/request-support',
  keywords: ['request', 'help', 'support', 'assistance', 'food', 'aid', 'children']
}, {
  id: 'become-donor',
  title: 'Become a Donor',
  description: 'Information on how to contribute as a donor to NourishNet',
  path: '/become-donor',
  keywords: ['donor', 'donate', 'contribution', 'help', 'give', 'support']
}, {
  id: 'about-us',
  title: 'About Us',
  description: 'Learn about NourishNet\'s mission, vision, and founding team',
  path: '/about-us',
  keywords: ['about', 'mission', 'vision', 'team', 'founders', 'history']
}, {
  id: 'local-support',
  title: 'Local Support',
  description: 'Find food support resources in your local community',
  path: '/local-support',
  keywords: ['local', 'community', 'nearby', 'location', 'area', 'support']
}];
// Support services data for search
const supportServicesData = [{
  id: 'emergency-meals',
  title: 'Emergency Meal Program',
  description: 'Immediate food assistance for children in crisis situations',
  path: '/instant-support',
  keywords: ['emergency', 'crisis', 'urgent', 'immediate', 'meals']
}, {
  id: 'school-lunches',
  title: 'School Lunch Program',
  description: 'Support for school meal programs in underserved communities',
  path: '/local-support',
  keywords: ['school', 'lunch', 'education', 'students', 'meals']
}, {
  id: 'weekend-backpack',
  title: 'Weekend Backpack Program',
  description: 'Food supplies for children during weekends and school holidays',
  path: '/local-support',
  keywords: ['weekend', 'backpack', 'holiday', 'supplies', 'package']
}];
// Locations data for search
const locationsData = [{
  id: 'global',
  title: 'Global Hunger Relief',
  description: 'International programs addressing childhood hunger worldwide',
  path: '/global-hunger',
  keywords: ['global', 'international', 'worldwide', 'hunger', 'relief']
}, {
  id: 'local',
  title: 'Local Community Support',
  description: 'Find support resources in your local community',
  path: '/local-support',
  keywords: ['local', 'community', 'nearby', 'neighborhood', 'area']
}];
// Function to get human-readable label for a category
export const getCategoryLabel = category => {
  switch (category) {
    case SEARCH_CATEGORIES.FOUNDERS:
      return 'Team Members';
    case SEARCH_CATEGORIES.PAGES:
      return 'Pages';
    case SEARCH_CATEGORIES.SUPPORT_SERVICES:
      return 'Support Services';
    case SEARCH_CATEGORIES.LOCATIONS:
      return 'Locations';
    case SEARCH_CATEGORIES.DONORS:
      return 'Donors';
    case SEARCH_CATEGORIES.FAMILIES:
      return 'Families';
    default:
      return 'Other';
  }
};
// Function to get icon name for a category
export const getCategoryIcon = category => {
  switch (category) {
    case SEARCH_CATEGORIES.FOUNDERS:
      return 'User';
    case SEARCH_CATEGORIES.PAGES:
      return 'File';
    case SEARCH_CATEGORIES.SUPPORT_SERVICES:
      return 'HeartHandshake';
    case SEARCH_CATEGORIES.LOCATIONS:
      return 'MapPin';
    case SEARCH_CATEGORIES.DONORS:
      return 'Heart';
    case SEARCH_CATEGORIES.FAMILIES:
      return 'Users';
    default:
      return 'Search';
  }
};
// Function to search across all data sources
export const performSearch = query => {
  if (!query || query.trim() === '') {
    return [];
  }
  const normalizedQuery = query.toLowerCase().trim();
  const results = [];
  // Search in founders data
  foundersData.forEach(founder => {
    if (founder.name.toLowerCase().includes(normalizedQuery) || founder.role.toLowerCase().includes(normalizedQuery) || founder.bio.toLowerCase().includes(normalizedQuery) || founder.education && founder.education.toLowerCase().includes(normalizedQuery) || founder.expertise.some(skill => skill.toLowerCase().includes(normalizedQuery))) {
      results.push({
        id: `founder-${founder.id}`,
        category: SEARCH_CATEGORIES.FOUNDERS,
        title: founder.name,
        description: founder.role,
        path: '/about-us',
        data: founder
      });
    }
  });
  // Search in pages data
  pagesData.forEach(page => {
    if (page.title.toLowerCase().includes(normalizedQuery) || page.description.toLowerCase().includes(normalizedQuery) || page.keywords.some(keyword => keyword.includes(normalizedQuery))) {
      results.push({
        id: `page-${page.id}`,
        category: SEARCH_CATEGORIES.PAGES,
        title: page.title,
        description: page.description,
        path: page.path
      });
    }
  });
  // Search in support services data
  supportServicesData.forEach(service => {
    if (service.title.toLowerCase().includes(normalizedQuery) || service.description.toLowerCase().includes(normalizedQuery) || service.keywords.some(keyword => keyword.includes(normalizedQuery))) {
      results.push({
        id: `service-${service.id}`,
        category: SEARCH_CATEGORIES.SUPPORT_SERVICES,
        title: service.title,
        description: service.description,
        path: service.path
      });
    }
  });
  // Search in locations data
  locationsData.forEach(location => {
    if (location.title.toLowerCase().includes(normalizedQuery) || location.description.toLowerCase().includes(normalizedQuery) || location.keywords.some(keyword => keyword.includes(normalizedQuery))) {
      results.push({
        id: `location-${location.id}`,
        category: SEARCH_CATEGORIES.LOCATIONS,
        title: location.title,
        description: location.description,
        path: location.path
      });
    }
  });
  return results;
};