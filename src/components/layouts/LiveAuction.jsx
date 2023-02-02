import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import Countdown from "react-countdown";
import CardModal from './CardModal'

// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

const LiveAuction = props => {
    const data = props.data;

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                        slidesPerView: 2,
                                    },
                                    991: {
                                        slidesPerView: 3,
                                    },
                                    1300: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {
                                    data.slice(0, 7).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="swiper-container show-shadow carousel auctions">
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        <div className="slider-item item">
                                                            <div className="sc-card-product">
                                                                <div className="card-media">
                                                                    {/* <Link to="/item-details-01"><img src={item.img} alt="axies" /></Link> */}
                                                                    <Link to="/"><img src={item.img} alt="axies" /></Link>
                                                                    {/* <Link to="/login" className="wishlist-button heart"><span className="number-like">{item.wishlist}</span></Link> */}
                                                                    {/* <div className="featured-countdown">
                                                                        <span className="slogan"></span>
                                                                        <Countdown date={Date.now() + 500000000}>
                                                                            <span>You are good to go!</span>
                                                                        </Countdown>
                                                                    </div> */}
                                                                    {/* <div className="button-place-bid">
                                                                        <button onClick={() => setModalShow(true)} className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></button>
                                                                    </div> */}
                                                                </div>
                                                                <div className="card-title">
                                                                    {/* <h5><Link to="/item-details-01">"{item.title}"</Link></h5> */}
                                                                    <div className="tags">{item.tags}</div>
                                                                </div>
                                                                <div className="meta-info">
                                                                    <div className="author">
                                                                        {/* <div className="avatar">
                                                                            <img src={item.imgAuthor} alt="item" className='h-100' />
                                                                        </div> */}
                                                                        <div className="info">
                                                                            <span>Creator</span>
                                                                            <h6> <Link to="/authors-02">{item.nameAuthor}
                                                                            </Link> </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <span>Current Bid</span>
                                                                        <h5> {item.price}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>

    );
}

LiveAuction.propTypes = {
    data: PropTypes.array.isRequired,
}


export default LiveAuction;
