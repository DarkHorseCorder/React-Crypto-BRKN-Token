import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import {UserContext} from '../provider/UserProvider';
import menus from "../../pages/menu";
import DarkMode from './DarkMode';
// import logoheader from '../../assets/images/logo/logo.png'
// import logoheader2x from '../../assets/images/logo/logo@2x.png'
// import logodark from '../../assets/images/logo/logo_dark.png'
// import logodark2x from '../../assets/images/logo/logo_dark@2x.png'
import logo from '../../assets/images/logo/logo_new.png'

import imgsun from '../../assets/images/icon/sun.png'
import avt from '../../assets/images/avatar/avt-2.jpg'

import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnect from "@walletconnect/web3-provider";

import {contractInstance} from '../contracts/contractInstance'
import { Decimals, Tokens } from '../contracts/addresses';
import tokenAbi from '../contracts/tokenAbi'

const getProviderOptions = () => {
    const infuraId = "00ca1859789d4b40bce01f4104844224";
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          network: "polygon",
          rpc: {
            137: "https://polygon-rpc.com/" // 137: "https://polygon-rpc.com/"
          }
        }
      }
    };
    return providerOptions;
};

const web3Modal = new Web3Modal({
    network: "Polygon",
    cacheProvider: true,
    providerOptions: getProviderOptions()
})

const Header = () => {

    const INITIAL_STATE = {
        address: "",
        amount: 0,
        web3: null,
        provider: null,
        connected: false,
        chainId: 1,
        networkId: 1,
        contract: null,
    };

    const { pathname } = useLocation();
    const {connectWallet, setConnectWallet,
        web3Data, setWeb3Data } = useContext(UserContext)

    const headerRef = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)
    const btnSearch = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }

    const searchBtn = () => {
        btnSearch.current.classList.toggle('active');
    }

    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          onConnect();
        }
    }, []);

    const showWallet = (address) => {
        return `${address.slice(0, 5)}...${address.slice(-5)}`
    }

    function initWeb3(provider) {
        const web3 = new Web3(provider);

        web3.eth.extend({
        methods: [
            {
                name: "chainId",
                call: "eth_chainId",
                outputFormatter: web3.utils.hexToNumber
            }
        ]
        });

        return web3;
    }

    const onConnect = async () => {
        try {
            const provider = await web3Modal.connect();
            await subscribeProvider(provider);
      
            await provider.enable();
            const web3 = initWeb3(provider);
      
            const curChainId = await provider.request({ method: 'eth_chainId' });
            const binanceTestChainId = '0x89'            // mainnet: 0x89, testnet: 0x13881
            if (curChainId === binanceTestChainId) {
              console.log("Bravo!, you are on the correct network");
            } else {
              try {
                await provider.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x89' }],
                });
                console.log("You have succefully switched to Binance Test network")
              } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {
                    await provider.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '0x89',
                          chainName: 'Polygon',                 // Polygon
                          rpcUrls: ['https://polygon-rpc.com/'],
                          blockExplorerUrls: ['https://polygonscan.com/'],
                          nativeCurrency: {
                            symbol: 'MATIC',
                            decimals: 18,
                          }
                        }
                      ]
                    });
                  } catch (addError) {
                    console.log(addError);
                    // alert(addError);
                  }
                }
                // alert("Failed to switch to the network")
                return;
              }
            }
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            const networkId = await web3.eth.net.getId();

            const chainId = await web3.eth.chainId();
            const contract = contractInstance();
            
            const tokenContract = new web3.eth.Contract(tokenAbi, Tokens['BRKN'])
            const balance = await tokenContract.methods.balanceOf(address).call()
            const stress = balance / (10**Decimals['BRKN']);

            const basicbalance = await web3.eth.getBalance(address)
            const stress1 = basicbalance / (10 ** 18)

            const usdtContract = new web3.eth.Contract(tokenAbi, Tokens['USDT'])
            const usdtbalance = await usdtContract.methods.balanceOf(address).call()
            const stress2 = usdtbalance / (10 ** Decimals['USDT'])
            
            setWeb3Data({
                address: address,
                basic: stress1,
                amount: stress,
                usdtAmount: stress2,
                web3: web3,
                provider: provider,
                connected: true,
                chainId: chainId,
                networkId: networkId,
                contract: contract,
            });

            setConnectWallet(true)
            
        } catch (e) {
            console.log(e);
        }    
    }

    const resetApp = async () => {
        const { web3 } = web3Data;
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        await web3Modal.clearCachedProvider();
        setWeb3Data({ ...INITIAL_STATE });
        setConnectWallet(false)
    };

    const subscribeProvider = async (provider) => {
        if (!provider.on) {
          return;
        }
        provider.on("close", () => resetApp());
        provider.on("accountsChanged", async (accounts) => {
          console.log(accounts[0])
          setWeb3Data({ ...web3Data, address: accounts[0] });
          // await this.getAccountAssets();
        });
        provider.on("chainChanged", async (chainId) => {
          const { web3 } = web3Data;
          const networkId = await web3.eth.net.getId();
          setWeb3Data({ ...web3Data, chainId: chainId, networkId: networkId });
          // await this.getAccountAssets();
        });
    
        provider.on("networkChanged", async (networkId) => {
          const { web3 } = web3Data;
          const chainId = await web3.eth.chainId();
          setWeb3Data({ ...web3Data, chainId: chainId, networkId: networkId });
          // await this.getAccountAssets();
        });
    };

    return (
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="site-header-inner">
                            <div className="wrap-box flex">
                                <div id="site-logo" className="clearfix">
                                    <div id="site-logo-inner">
                                        <Link to="/" rel="home" className="main-logo d-flex align-items-center text-white">
                                            <img className='logo-dark' id="logo_header" src={logo} srcSet={`${logo}`} alt="nft-gaming" />
                                            <img className='logo-light' id="logo_header" src={logo} srcSet={`${logo}`} alt="nft-gaming" />
                                            <h2 className='d-lg-block d-none' style={{ marginLeft: '2rem' }}>BRKN Coin</h2>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                                <nav id="main-nav" className="main-nav" ref={menuLeft} >
                                    <ul id="menu-primary-menu" className="menu">
                                        {
                                            menus.map((data, index) => (
                                                <li key={index} onClick={() => handleOnClick(index)} className={`menu-item ${data.namesub ? 'menu-item-has-children' : ''} ${activeIndex === index ? 'active' : ''} `}   >
                                                    {data.id===5?<a href={data.links} target="_blank" rel="noreferrer">{data.name}</a>:<Link to={data.links}>{data.name}</Link>}
                                                    {
                                                        data.namesub &&
                                                        <ul className="sub-menu" >
                                                            {
                                                                data.namesub.map((submenu) => (
                                                                    <li key={submenu.id} className={
                                                                        pathname === submenu.links
                                                                            ? "menu-item current-item"
                                                                            : "menu-item"
                                                                    }><Link to={submenu.links}>{submenu.sub}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }

                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                                <div className="flat-search-btn flex">
                                    <div className="header-search flat-show-search" id="s1">
                                        <Link to="#" className="show-search header-search-trigger" onClick={searchBtn}>
                                            <i className="far fa-search"></i>
                                        </Link>
                                        <div className="top-search" ref={btnSearch}>
                                            <form action="#" method="get" role="search" className="search-form">
                                                <input type="search" id="s" className="search-field" placeholder="Search..." name="s" title="Search for" required="" />
                                                <button className="search search-submit" type="submit" title="Search">
                                                    <i className="icon-fl-search-filled"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="sc-btn-top mg-r-12" id="site-header">
                                        {/* <Link to={link} className="sc-button header-slider style style-1 wallet fl-button pri-1"><span>Connect Wallet
                                        </span></Link> */}
                                        {
                                            connectWallet == false ? 
                                                <button className="sc-button header-slider style style-1 wallet fl-button pri-1" onClick={onConnect} >
                                                    Connect Wallet
                                                </button>
                                            :
                                                <button className="sc-button header-slider style style-1 wallet fl-button pri-1" onClick={resetApp} >
                                                    {showWallet(web3Data.address)}
                                                </button>
                                        }
                                    </div>

                                    <div className="admin_active" id="header_admin">
                                        <div className="header_avatar">
                                            <div className="price">
                                                <span>2.45 <strong>ETH</strong> </span>
                                            </div>
                                            <img
                                                className="avatar"
                                                src={avt}
                                                alt="avatar"
                                            />
                                            <div className="avatar_popup mt-20">
                                                <div className="d-flex align-items-center copy-text justify-content-between">
                                                    <span> 13b9ebda035r178... </span>
                                                    <Link to="/" className="ml-2">
                                                        <i className="fal fa-copy"></i>
                                                    </Link>
                                                </div>
                                                <div className="d-flex align-items-center mt-10">
                                                    <img
                                                        className="coin"
                                                        src={imgsun}
                                                        alt="/"
                                                    />
                                                    <div className="info ml-10">
                                                        <p className="text-sm font-book text-gray-400">Balance</p>
                                                        <p className="w-full text-sm font-bold text-green-500">16.58 ETH</p>
                                                    </div>
                                                </div>
                                                <div className="hr"></div>
                                                <div className="links mt-20">
                                                    <Link to="#">
                                                        <i className="fab fa-accusoft"></i> <span> My items</span>
                                                    </Link>
                                                    <a className="mt-10" href="/edit-profile">
                                                        <i className="fas fa-pencil-alt"></i> <span> Edit Profile</span>
                                                    </a>
                                                    <a className="mt-10" href="/login" id="logout">
                                                        <i className="fal fa-sign-out"></i> <span> Logout</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DarkMode />
        </header>
    );
}

export default Header;
