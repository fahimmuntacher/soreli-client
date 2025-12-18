import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedLessons from "./FeaturedLesson";
import BenefitCards from "./BenefitCards";
import { Helmet } from "react-helmet";
import TopContributors from "./TopContributor/TopContributor";

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

      <div>
        <HeroSlider />
        <FeaturedLessons />
        <BenefitCards />
        <TopContributors />
      </div>
    </>
  );
};

export default Home;
