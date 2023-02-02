import React from 'react';
// import { Link } from 'react-router-dom'
// import icon1 from '../../assets/images/icon/Wallet.png'
// import icon2 from '../../assets/images/icon/Category.png'
// import icon3 from '../../assets/images/icon/Image2.png'
// import icon4 from '../../assets/images/icon/Bookmark.png'
// import crypto from '../../assets/images/box-item/crypto-1.jpg'
import tokenImage from '../../assets/images/blog/token-image.png'



const Create = () => {
    // const data = [
    //     {
    //         title: "Set Up Your Wallet",
    //         description: "Wallet that is functional for NFT purchasing. You may have a Coinbase account at this point, but very few are actually set up to buy an NFT.",
    //         icon: icon1,
    //         colorbg: "icon-color1"
    //     },
    //     {
    //         title: "Create Your Collection",
    //         description: "Setting up your NFT collection and creating NFTs on NFTs is easy! This guide explains how to set up your first collection",
    //         icon: icon2,
    //         colorbg: "icon-color2"
    //     },
    //     {
    //         title: "Add Your NFTs",
    //         description: "Sed ut perspiciatis un de omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
    //         icon: icon3,
    //         colorbg: "icon-color3"
    //     },
    //     {
    //         title: "List Them For Sale",
    //         description: "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!",
    //         icon: icon4,
    //         colorbg: "icon-color4"
    //     },
    // ]
    return (
        <section className="tf-box-icon create style1 tf-section" style={{ backgroundImage: `url(${tokenImage})`, backgroundSize: 'contain' }}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions mg-bt-22 flex-column">
                            <h2 className="tf-title pb-17">
                                Hurry to invest in cryptocurrency
                            </h2>
                            <h3 className='sub-title'>
                                It is a Token that does not have Valatility like most Cryptocurrencies.
                            </h3>
                            <h4 className='mg-t-24'>
                                because it uses a system or Software that is the one that produces supply and demond, to increase its value and the obsence of Crypto Whales to control the purchase and sale of the Token
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// const CreateItem = props => (
//     <div className='col-lg-3 col-md-6 col-12'>
//         <div className="sc-box-icon">
//             <div className="image">
//                 <div className={`icon-create ${props.item.colorbg}`}>
//                     <img src={props.item.icon} alt="" />
//                 </div>
//             </div>
//             <h3 className="heading"><Link to="/wallet">{props.item.title}</Link></h3>
//             <p className="content">{props.item.description}</p>
//         </div>
//     </div>
// )

export default Create;
