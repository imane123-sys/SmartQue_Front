import React from "react";
import "./LandingV2.css";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import HowItWorks from "./HowItWorks/HowItWorks";
import About from "./About/About";
import UniqueFeatures from "./UniqueFeatures/UniqueFeatures";
import SocialProof from "./SocialProof/SocialProof";
import CtaBanner from "./CtaBanner/CtaBanner";
import Footer from "./Footer/Footer";

export const LandingV2 = () => {
  return (
    <div className="landing-v2-wrapper">
      <Navbar />

      <Hero />

      <HowItWorks />

      <About />

      <UniqueFeatures />

      <SocialProof />

      <CtaBanner />

      <Footer />
    </div>
  );
};

export default LandingV2;
