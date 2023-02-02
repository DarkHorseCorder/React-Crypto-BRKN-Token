
import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import tokenImage from '../../assets/images/blog/token-image.png'
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

const BrazToken = () => {
    return (
        <Fragment>
            <section className="tf-contact tf-section">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="box-feature-contact">
                                <img src={tokenImage} alt="Axies" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <h2 className="tf-title-heading style-2 mg-bt-12 fab buy-text-show">
                                BUY, SELL AND EXCHANGE BRKN
                            </h2>
                            <h2 className="font-weight-bold mg-bt-12">
                                Welcome to BRAZKUB NETWORK
                            </h2>
                            <div className="form-inner">
                                <div id="contactform" noValidate="novalidate" className="form-submit" >
                                    <p>
                                    BRAZKUB NETWORK(BRKN) is a Wave Chain's Token, and it is the most important element in this new data exchange ecosystem.

                                    </p>
                                    <p>
                                        Smart contracts, which are the applications stored on the Wave chain, are built by the data providers, the buyers'data, and the BRKN platform.
                                    </p>
                                    <p>
                                        Now you have safety access to your cryptocoins from anywhere and can trade with no warries.
                                    </p>
                                    <p>
                                        This platform allows to create and execute "smart contracts", that are written as programming codes that can be executed in computers.
                                    </p>
                                    <p className='mg-bt-24'>
                                        This way, it is possible to negotiate and make business with unknown people, in a transparent and fast way, also with low prices.
                                    </p>
                                    <button className="submit" onClick={e => window.location.href = "https://waves.exchange/trading/spot/EnoA3vZWfwp27GDBNP6gb48dvC4HhHrFxDHgSPbDp5Mx_WAVES"}> BRKN Token  Wave Exchange </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>

    );
}

BrazToken.propTypes = {
    data: PropTypes.array.isRequired,
}

export default BrazToken;
