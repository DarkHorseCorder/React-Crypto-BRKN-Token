import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import BrazToken from '../components/layouts/BrazToken.jsx';
import Digital from '../components/layouts/Digital.jsx';
// import TopSeller from '../components/layouts/TopSeller';
// import topSellerData from '../assets/fake-data/data-top-seller'
// import TodayPicks from '../components/layouts/TodayPicks';
// import todayPickData from '../assets/fake-data/data-today-pick';
// import PopularCollection from '../components/layouts/PopularCollection';
// import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';

const Home01 = () => {

    return (
        <div className='home-1'>
            {/* <Header /> */}
            <Slider data={heroSliderData} />
            <BrazToken data={liveAuctionData} />
            <Digital data={liveAuctionData} />
            <LiveAuction data={liveAuctionData} />
            {/* <TopSeller data={topSellerData} /> */}
            {/* <TodayPicks data={todayPickData} /> */}
            {/* <PopularCollection data={popularCollectionData} /> */}
            <Create />
            {/* <Footer /> */}
        </div>
    );
}

export default Home01;
