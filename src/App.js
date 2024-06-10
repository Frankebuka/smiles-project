import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateCampaign from "./pages/CreateCampaign";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Testimonies from "./pages/Testimonies";
import EditCampaign from "./pages/EditCampaign";
import Campaign from "./pages/Campaign";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Campaigns from "./pages/Campaigns";
import Checkout from "./components/Checkout";
import Testimony from "./pages/Testimony";
import ThankYou from "./pages/ThankYou";
import PageNotFound from "./pages/PageNotFound";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-252601332-1";
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/checkout" element={<PrivateRoute />}>
            <Route path="/checkout/:campaignIdz" element={<Checkout />} />
          </Route>
          <Route path="/history" element={<PrivateRoute />}>
            <Route path="/history" element={<Dashboard />} />
          </Route>
          <Route path="/balances" element={<PrivateRoute />}>
            <Route path="/balances" element={<Dashboard />} />
          </Route>
          <Route path="/cards" element={<PrivateRoute />}>
            <Route path="/cards" element={<Dashboard />} />
          </Route>
          <Route path="/analytics" element={<PrivateRoute />}>
            <Route path="/analytics" element={<Dashboard />} />
          </Route>
          <Route path="/reports" element={<PrivateRoute />}>
            <Route path="/reports" element={<Dashboard />} />
          </Route>
          <Route path="/settings" element={<PrivateRoute />}>
            <Route path="/settings" element={<Dashboard />} />
          </Route>
          <Route path="/help" element={<PrivateRoute />}>
            <Route path="/help" element={<Dashboard />} />
          </Route>
          <Route path="/privacy" element={<PrivateRoute />}>
            <Route path="/privacy" element={<Dashboard />} />
          </Route>
          <Route path="/thank-you" element={<PrivateRoute />}>
            <Route path="/thank-you/:idz" element={<ThankYou />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/testimony/:id" element={<Testimony />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Campaign />}
          />
          <Route path="/create-campaign" element={<PrivateRoute />}>
            <Route path="/create-campaign" element={<CreateCampaign />} />
          </Route>
          <Route path="/edit-campaign" element={<PrivateRoute />}>
            <Route
              path="/edit-campaign/:listingId"
              element={<EditCampaign />}
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
