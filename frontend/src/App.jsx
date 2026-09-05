import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MacroCartProvider } from './context/MacroCartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

import NutritionTargetSetup from './pages/NutritionTargetSetup';
import FoodPreferences from './pages/FoodPreferences';
import MealSelection from './pages/MealSelection';
import MealTiming from './pages/MealTiming';

import ExploreMeals from './pages/ExploreMeals';
import FoodDetails from './pages/FoodDetails';
import BuildYourMeal from './pages/BuildYourMeal';
import CustomizeMealPage from './pages/CustomizeMealPage';
import MacroTrackerPage from './pages/MacroTrackerPage';
import SmartRecommendationsPage from './pages/SmartRecommendationsPage';
import DailyMealReview from './pages/DailyMealReview';

import Cart from './pages/Cart';
import AddressPage from './pages/AddressPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';

import CustomerDashboard from './pages/CustomerDashboard';
import TodaysMeals from './pages/TodaysMeals';
import UpcomingMeals from './pages/UpcomingMeals';
import ChangeUpcomingMeal from './pages/ChangeUpcomingMeal';
import OrderHistory from './pages/OrderHistory';
import TrackDelivery from './pages/TrackDelivery';
import Profile from './pages/Profile';

import SubscriptionPlans from './pages/SubscriptionPlans';
import ManageSubscription from './pages/ManageSubscription';
import PauseSubscription from './pages/PauseSubscription';
import ResumeSubscription from './pages/ResumeSubscription';
import ChangeSubscription from './pages/ChangeSubscription';
import CancelSubscription from './pages/CancelSubscription';

import SingleMealOrdering from './pages/SingleMealOrdering';
import SnacksPage from './pages/SnacksPage';

import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import HelpSupport from './pages/HelpSupport';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <AuthProvider>
      <MacroCartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background text-on-surface">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Onboarding */}
                <Route path="/onboarding/targets" element={<NutritionTargetSetup />} />
                <Route path="/onboarding/preferences" element={<FoodPreferences />} />
                <Route path="/onboarding/meal-plan-select" element={<MealSelection />} />
                <Route path="/onboarding/timings" element={<MealTiming />} />

                {/* Core Catalog & Builder */}
                <Route path="/explore-meals" element={<ExploreMeals />} />
                <Route path="/food/:id" element={<FoodDetails />} />
                <Route path="/build-meals" element={<BuildYourMeal />} />
                <Route path="/customize-dish/:id" element={<CustomizeMealPage />} />
                <Route path="/macro-tracker" element={<MacroTrackerPage />} />
                <Route path="/recommendations" element={<SmartRecommendationsPage />} />
                <Route path="/review-meals" element={<DailyMealReview />} />

                {/* Checkout & Cart */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Cart />} />
                <Route path="/checkout/address" element={<AddressPage />} />
                <Route path="/checkout/payment" element={<PaymentPage />} />
                <Route path="/checkout/success" element={<PaymentSuccessPage />} />

                {/* Dashboard & Orders */}
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/dashboard/todays-meals" element={<TodaysMeals />} />
                <Route path="/dashboard/upcoming-meals" element={<UpcomingMeals />} />
                <Route path="/dashboard/change-meal/:orderId" element={<ChangeUpcomingMeal />} />
                <Route path="/dashboard/order-history" element={<OrderHistory />} />
                <Route path="/dashboard/track-delivery/:orderId" element={<TrackDelivery />} />
                <Route path="/dashboard/profile" element={<Profile />} />

                {/* Subscription Management */}
                <Route path="/subscriptions/plans" element={<SubscriptionPlans />} />
                <Route path="/dashboard/subscription" element={<ManageSubscription />} />
                <Route path="/dashboard/subscription/pause" element={<PauseSubscription />} />
                <Route path="/dashboard/subscription/resume" element={<ResumeSubscription />} />
                <Route path="/dashboard/subscription/change" element={<ChangeSubscription />} />
                <Route path="/dashboard/subscription/cancel" element={<CancelSubscription />} />

                {/* Extra Categories */}
                <Route path="/single-meal" element={<SingleMealOrdering />} />
                <Route path="/snacks" element={<SnacksPage />} />

                {/* Info & Legal */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help-support" element={<HelpSupport />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MacroCartProvider>
    </AuthProvider>
  );
}
