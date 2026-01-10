import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLesson";
import BenefitCards from "./BenefitCards";
import { Helmet } from "react-helmet";
import TopContributors from "./TopContributor/TopContributor";
import HowItWorks from "./HowItWorks";
import RecentLessons from "./RecentLessons";
import Categories from "./Categories";
import Testimonials from "./Testimonials";
import NewsletterCTA from "./NewsletterCTA";

const Home = () => {
  return (
    <>
      <title>Soreli - Learn, Reflect & Grow</title>
      <Helmet>
        <meta
          name="description"
          content="Discover meaningful life lessons, personal growth wisdom, and insights shared by people worldwide. Start growing today."
        />
        <meta property="og:title" content="Digital Life Lessons" />
        <meta
          property="og:description"
          content="Your digital home for wisdom, reflection, and growth."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col gap-30 mb-20">
        <HeroSlider />

        {/* Featured lessons + quick benefits */}
        <FeaturedLessons />

        <BenefitCards />

        {/* How it works */}
        <HowItWorks />

        {/* Stats (replaces recent lessons) */}
        <RecentLessons />

        {/* Categories */}
        <Categories />

        {/* Testimonials */}
        <Testimonials />

        {/* Top contributors */}
        <TopContributors />

        {/* Newsletter CTA */}
        <NewsletterCTA />
      </div>
    </>
  );
};

export default Home;
