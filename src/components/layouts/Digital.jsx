
import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
// import digitial from '../../assets/images/blog/digital.jpg'
import tokenImage from '../../assets/images/blog/token-image.png'

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
const Digital = () => {
    return (
        <Fragment>
            <section className="tf-digital tf-section" style={{ backgroundImage: `url(${tokenImage})`, backgroundSize: 'contain' }}>
                <div className='text-center d-flex align-items-center justify-content-center flex-column'>
                    <h2 className='mg-bt-12'>Life in the digital world</h2>
                    <h3 className='sub-title mg-bt-12'>Blockchain Technology</h3>
                    <div className='d-flex w-50 justify-content-around'>
                        <div className='sc-card-activity flex-column digital-item'>
                            <h2 className='mg-bt-12'>6386</h2>
                            <h3>Market price</h3>
                        </div>
                        <div className='sc-card-activity flex-column digital-item'>
                            <h2 className='mg-bt-12'>16mb</h2>
                            <h3>Average black size</h3>
                        </div>
                        <div className='sc-card-activity flex-column digital-item'>
                            <h2 className='mg-bt-12'>4327</h2>
                            <h3>Clients worldwide</h3>
                        </div>
                        <div className='sc-card-activity flex-column digital-item'>
                            <h2 className='mg-bt-12'>2000+</h2>
                            <h3>Transactions</h3>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>

    );
}

Digital.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Digital;
