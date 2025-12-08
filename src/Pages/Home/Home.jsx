import React from 'react';
import HeroSlider from './HeroSlider';
import FeaturedLessons from './FeaturedLesson';
import BenefitCards from './BenefitCards';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedLessons></FeaturedLessons>
            <BenefitCards></BenefitCards>
        </div>
    );
};

export default Home;