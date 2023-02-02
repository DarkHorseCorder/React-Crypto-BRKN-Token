import '../../assets/css/swap.scss'
import '../../assets/css/button.scss'
import '../../assets/css/input.scss'
import React from 'react';
import { css } from "@emotion/react";
import {UserContext} from '../../components/provider/UserProvider';
import {useContext, useEffect, useState} from 'react';
import { BounceLoader } from "react-spinners";
import { Tokens, Decimals } from "../../components/contracts/addresses"
import { loadInstance } from '../../components/contracts/contractInstance'

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Web3 from 'web3';

const override = css`
  display: block;
  border-color: #283825;
`;

const Trade = () => {
  const {
    connectWallet,
    web3Data
  } = useContext(UserContext);

  const [fromVal, setFromVal] = useState(0)
  const [fromToken, setFromToken] = useState('BRKN')
  const [toVal, setToVal] = useState(0)
  const [toToken, setToToken] = useState('USDT')
  const [isApproved, setApproved] = useState(false)
  const [loadSwap, setLoadSwap] = useState(false)
  const [rateChange, setRateChange] = useState(false);
  const [rateAtoB, setRateAtoB] = useState(0)
  const [rateBtoA, setRateBtoA] = useState(0)
  const [showRating, setShowRating] = useState('');
  const [isValid, setIsValid] = useState(false)

  function exchangeFromTo () {
    let temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromVal(0)
    setToVal(0)
  }

  function handleChange () {
    const value = !rateChange
    setRateChange(!rateChange)
    if(value == false) {
        setShowRating(`${rateAtoB} BRKN per USDT`)
    } else {
        setShowRating(`${rateBtoA} USDT per BRKN`)
    }
  }

  useEffect(() => {
    if(rateChange == false) {
      setShowRating(`${rateAtoB} BRKN per USDT`)
    } else {
      setShowRating(`${rateBtoA} USDT per BRKN`)
    }
  }, [rateAtoB, rateBtoA])

  const beforeSwap = async () => {
    if(fromToken == 'BRKN') {
      const result = await web3Data.contract.estimateBRKN2USDT(web3Data.address, fromVal * 10 ** Decimals[fromToken])
      console.log(result)
      if(result[0] == 'gas:' && result[1] <= web3Data.basic) {
        return true
      } else if(result[0] == 'error') {
        alert(result[1])
      }
    } else if(fromToken == 'USDT') {
      const result = await web3Data.contract.estimateUSDT2BRKN(web3Data.address, fromVal * 10 ** Decimals[fromToken])
      console.log(result)
      if(result[0] == 'gas:' && result[1] <= web3Data.basic) {
        return true
      } else if(result[0] == 'error') {
        alert(result[1])
      }
    }
    return false;
}

  const swapFunction = async (e) => {
    setLoadSwap(true)
    if(isValid == true) {
      if(isApproved == false) {
        const res = await web3Data.contract.approve2Router(Tokens[fromToken], web3Data.address, fromVal, Decimals[fromToken] )
        setApproved(res)
      }
      else {
        console.log(web3Data.address, fromVal * 10 ** Decimals[fromToken])
        const flag = await beforeSwap()
        if(flag == true) {
          if(fromToken == 'BRKN') {
            await web3Data.contract.swapBRKN2USDT(web3Data.address, fromVal * 10 ** Decimals[fromToken])
          } else if(fromToken == 'USDT') {
            await web3Data.contract.swapUSDT2BRKN(web3Data.address, fromVal * 10 ** Decimals[fromToken])
          }
          setApproved(false)
        }
      }
    }
    setLoadSwap(false)
  }

  const loadRate = async () => {
    // var value = await loadInstance().loadPerRate([Tokens[fromToken], Tokens[toToken]], Decimals[fromToken], Decimals[toToken])
    // setRateAtoB(parseFloat(value).toFixed(8))
    var value = await loadInstance().loadPerRate()
    setRateAtoB(value[0])
    setRateBtoA(value[1])
  }

  const calcPrice = async () => {
    // const val1 = await loadInstance().loadRate([Tokens[fromToken], Tokens[toToken]], fromVal * 10 ** Decimals[fromToken], Decimals[toToken])
    const val1 = await loadInstance().loadRate(fromToken, fromVal * 10 ** Decimals[fromToken])
    setToVal(val1.toFixed(6))
  }

  useEffect(() => {
    connectWallet && loadRate()
  }, [connectWallet, fromToken])

  useEffect(() => {
    if(fromVal > 0) {
      connectWallet && calcPrice()
    }
    if(connectWallet) {
      // && fromVal > 0 && fromVal < web3Data.amount
      console.log(fromToken, fromVal, web3Data)
      if(fromToken == 'BRKN' && fromVal >= 100 && fromVal <= web3Data.amount) {
        setIsValid(true)
      } else if(fromToken == 'USDT' && fromVal >= 1 && fromVal <= web3Data.usdtAmount) {
        setIsValid(true)
      }
    }
  }, [fromVal, connectWallet])

  const reLoad = async () => {
    connectWallet && loadRate()
  }

  return (
    <div>
      <div className="swap">
          <div className="container">
              <div className="header">
                  <div className="title">
                      <h1>Exchange</h1>
                      <p> Trade BRKNs in an instant </p>    
                  </div>
                  <div className='settings'>
                      <button className='button swap-head-btn' type="button" onClick={reLoad}><i className='bi bi-arrow-counterclockwise'></i></button>
                  </div>
              </div>
              <p className="br"/>
              <div className='from'>
                <div className='from-balance'>
                  <p>From</p>
                </div>
                <div className='action'>
                  <input value={fromVal}
                    placeholder="0.0"
                    className='input swap-balance-input'
                    type="text"
                    onChange={(e) => {
                      const val = e.target.value
                      var str = val.replace(',', '.')
                      setFromVal(str)
                    }}
                  />
                  <button className="button select-currency" type="button">
                    {fromToken}
                  </button>
                </div>
              </div>
              <div className="exchange-from-to">
                  <button 
                      className="button"
                      type="button"
                      onClick={() => exchangeFromTo()}    
                  >
                      <i className="bi bi-arrow-down"></i>
                  </button>
              </div>   
              <div className='to'>
                <div className='from-balance'>
                  <p>To</p>
                </div>
                <div className='action'>
                  <input
                    value={toVal}
                    placeholder="0.0"
                    className='input swap-balance-input'
                    type="number"
                    onChange={(val) => {
                      setToVal(val)
                    }}
                  />
                  <button className='button select-currency' type="button">
                    {toToken}
                  </button>
                </div>
              </div>
              {
                showRating != '' && rateAtoB != 0 && rateBtoA != 0 ?
                  <div className="rate">
                    <p>Price</p>
                    <div className='rate'>
                      <p>{showRating}</p>
                      <button
                          className="button"
                          type="button"
                          onClick={() => handleChange()}
                      >
                          <i className='bi bi-arrow-left-right' />
                      </button>
                    </div>
                  </div>
                  :
                  <></>
              }
              <button
                className={
                  !connectWallet ?
                    "button swap-btn" :
                  (fromVal == 0 || toVal == 0 || isValid == 0) ?
                    "button swap-btn swap-disabled-btn" :
                    "button swap-btn"
                }
                disabled={loadSwap}
                type="button"
                onClick={(e) => swapFunction(e)}
              >
                {
                  loadSwap && <BounceLoader color='#283825' css={override} size={28} /> 
                }
                {
                  !connectWallet ? 
                    "Unlock Wallet" :
                  (fromVal == 0 || toVal == 0) ?
                    "Enter an amount" :
                  isApproved == false ?
                    'Approve' : 'Swap'
                }
              </button>
          </div>
      </div>
    </div>
  )
}

export default Trade