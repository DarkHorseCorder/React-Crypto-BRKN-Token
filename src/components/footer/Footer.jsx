import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import logodark from '../../assets/images/logo/logo_dark.png'
// import logofooter from '../../assets/images/logo/logo2.png'
import logo from '../../assets/images/logo/logo_new.png'

const Footer = () => {
    const accountList = [
        {
            title: "Authors",
            // link: "/authors-01"
            link: "/"
        },
        {
            title: "Collection",
            // link: "/wallet"
            link: "/"
        },
        {
            title: "Author Profile",
            // link: "/edit-profile"
            link: "/"
        },
        {
            title: "Create Item",
            // link: "/create-item"
            link: "/"
        },
    ]
    const resourcesList = [
        {
            title: "Help & Support",
            // link: "/help-center"
            link: "/"
        },
        {
            title: "Live Auctions",
            // link: "/live-auctions"
            link: "/"
        },
        {
            title: "Item Details",
            // link: "/item-details-01"
            link: "/"
        },
        {
            title: "Activity",
            // link: "/activity-01"
            link: "/"
        },
    ]
    const companyList = [
        {
            title: "Explore",
            // link: "/explore-01"
            link: "/"
        },
        {
            title: "Contact Us",
            // link: "/contact-01"
            link: "/"
        },
        {
            title: "Our Blog",
            // link: "/blog"
            link: "/"
        },
        {
            title: "FAQ",
            // link: "/faq"
            link: "/"
        },
    ]
    const socialList = [
        {
            icon: "fab fa-twitter",
            // link: "#"
            link: "/"
        },
        {
            icon: "fab fa-facebook",
            // link: "#"
            link: "/"
        },
        {
            icon: "fab fa-telegram-plane",
            // link: "#"
            link: "/"
        },
        {
            icon: "fab fa-youtube",
            // link: "#"
            link: "/"
        },
        {
            icon: "icon-fl-tik-tok-2",
            // link: "#"
            link: "/"
        },
        {
            icon: "icon-fl-vt",
            // link: "#"
            link: "/"
        },


    ]

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    return (
        <div>
            <footer id="footer" className="footer-light-style clearfix bg-style">
                <div className="themesflat-container">
                    <p className='mg-bt-24'>
                        The Brazkub Network is a smart contract that runs on the Wave Chain and does not belong to any individual or commercial company.
                        Its purpose is to distribute the BRKN token evenly among all smart contract users, using WAVE and BRKN.
                        The distribution is controlled by the smart contract algorithm, which is immutable, uncontrollable and unstoppable.
                        The site administrators are NOT owners of the BRKN project and do not have any technical or other means of accessing user funds which are ALWAYS sent directly to P2P (Person 2 Person) users' wallets.
                    </p>
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="widget widget-logo">
                                <div className="logo-footer" id="logo-footer" style={{ width: '15%' }}>
                                    <Link to="/" className='d-flex'>
                                        <img className='logo-dark' id="logo_footer" src={logo} alt="nft-gaming" />
                                        <img className='logo-light' id="logo_footer" src={logo} alt="nft-gaming" />
                                        <h3 style={{ marginLeft: '2rem' }}>Brazkub Network</h3>
                                    </Link>
                                </div>
                                {/* <p className="sub-widget-logo">Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis non, fugit totam vel laboriosam vitae.</p> */}
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                            <div className="widget widget-menu style-1">
                                <h5 className="title-widget">My Account</h5>
                                <ul>
                                    {
                                        accountList.map((item, index) => (
                                            <li key={index}><Link to={item.link}>{item.title}</Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-7 col-7">
                            <div className="widget widget-menu style-2">
                                <h5 className="title-widget">Resources</h5>
                                <ul>
                                    {
                                        resourcesList.map((item, index) => (
                                            <li key={index}><Link to={item.link}>{item.title}</Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                            <div className="widget widget-menu fl-st-3">
                                <h5 className="title-widget">Company</h5>
                                <ul>
                                    {
                                        companyList.map((item, index) => (
                                            <li key={index}><Link to={item.link}>{item.title}</Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-7 col-12">
                            <div className="widget widget-subcribe">
                                <h5 className="title-widget">Subscribe Us</h5>
                                <div className="form-subcribe">
                                    <form id="subscribe-form" action="#" method="GET" acceptCharset="utf-8" className="form-submit">
                                        <input name="email" className="email" type="email" placeholder="info@yourgmail.com" required />
                                        <button id="submit" name="submit" type="submit"><i className="icon-fl-send"></i></button>
                                    </form>
                                </div>
                                <div className="widget-social style-1 mg-t32">
                                    <ul>
                                        {
                                            socialList.map((item, index) => (
                                                <li key={index}><Link to={item.link}><i className={item.icon}></i></Link></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {
                isVisible &&
                <Link onClick={scrollToTop} to='#' id="scroll-top"></Link>
            }

            <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body space-y-20 pd-40">
                            <h3>Place a Bid</h3>
                            <p className="text-center">You must bid at least <span className="price color-popup">4.89 ETH</span>
                            </p>
                            <input type="text" className="form-control"
                                placeholder="00.00 ETH" />
                            <p>Enter quantity. <span className="color-popup">5 available</span>
                            </p>
                            <input type="number" className="form-control" placeholder="1" />
                            <div className="hr"></div>
                            <div className="d-flex justify-content-between">
                                <p> You must bid at least:</p>
                                <p className="text-right price color-popup"> 4.89 ETH </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p> Service free:</p>
                                <p className="text-right price color-popup"> 0,89 ETH </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p> Total bid amount:</p>
                                <p className="text-right price color-popup"> 4 ETH </p>
                            </div>
                            <Link to="#" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Footer;
