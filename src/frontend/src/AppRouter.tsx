import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { RequestSupport } from './pages/RequestSupport';
import { BecomeDonor } from './pages/BecomeDonor';
import { Contact } from './pages/Contact.tsx';
import { InstantSupport } from './pages/InstantSupport';
import { TrackDonation } from './pages/TrackDonation';
import { VerificationCenter } from './pages/VerificationCenter';
import { SocialActivity } from './pages/SocialActivity';
import { GlobalHunger } from './pages/GlobalHunger';
import { LocalSupport } from './pages/LocalSupport';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { LiveChat } from './components/Chat/LiveChat';
import { ImpactStories } from './pages/ImpactStories';
import { ProviderVerification } from './pages/ProviderVerification';
import { VolunteerRegistration } from './pages/VolunteerRegistration';
import { AboutUs } from './pages/AboutUs';
import { SearchResults } from './pages/SearchResults';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/request-support" element={<RequestSupport />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/instant-support" element={<InstantSupport />} />
        <Route path="/track-donation" element={<TrackDonation />} />
        <Route path="/verification-center" element={<VerificationCenter />} />
        <Route path="/social-activity" element={<SocialActivity />} />
        <Route path="/global-hunger" element={<GlobalHunger />} />
        <Route path="/local-support" element={<LocalSupport />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/impact-stories" element={<ImpactStories />} />
        <Route path="/provider-verification" element={<ProviderVerification />} />
        <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
      <LiveChat />
    </BrowserRouter>;
}