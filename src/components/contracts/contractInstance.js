import Web3 from 'web3'
import { pancakeswapRouter } from './addresses'
import tokenAbi from './tokenAbi'
import routerAbi from './routerAbi'

const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
}

  
export const contractInstance = () => {
    if(!provider()){
        return null;
    }
    const web3 = new Web3(provider());
    const pancakeRouterContract = new web3.eth.Contract(routerAbi, pancakeswapRouter)
    return {
        async loadBNB (address) {
            const balance  = await web3.eth.getBalance(address)
            const stress = web3.utils.fromWei(balance, 'ether')
            return parseFloat(stress).toFixed(4)
        },
        async approve2Router (address, account, amount, balance) {
            try {
                const contract = new web3.eth.Contract(tokenAbi, address)
                var BN = web3.utils.BN
                const tx = await contract.methods.approve(pancakeswapRouter, new BN((amount * 10 ** balance).toString()))
                            .send({'from': account})
                console.log(tx)
                return true
            } catch(err) {
                alert(err.message)
                console.log(err)
                return false
            }
        },
        // async swapETHforToken (route, account, amountIn) {
        //     try {
        //         const curdate = new Date(Date.now()).getTime();
        //         const deadline = parseInt(curdate / 1000) + 300;
        //         console.log(deadline)
        //         var BN = web3.utils.BN
        //         const rate = await pancakeRouterContract.methods.swapExactETHForTokens(
        //             1,
        //             route,
        //             account,
        //             deadline
        //         ).send({'from': account, 'value': amountIn * 1e18})
        //     } catch (err) {
        //         console.log(err)
        //     }
        // },
        // async swapTokenforETH (address1, address2, account, amountIn) {
        //     try {
        //         const curdate = new Date(Date.now()).getTime();
        //         const deadline = parseInt(curdate / 1000) + 300;
        //         var BN = web3.utils.BN
        //         const rate = await pancakeRouterContract.methods.swapExactTokensForETH(
        //             new BN((amountIn * 1e18).toString()),
        //             1,
        //             [address1, address2],
        //             account,
        //             deadline
        //         ).send({'from': account})
        //     } catch (err) {
        //         console.log(err)
        //     }
        // },
        // async swapTokenforToken(route, account, amountIn, balance) {
        //     try {
        //         const curdate = new Date(Date.now()).getTime();
        //         const deadline = parseInt(curdate / 1000) + 300;
        //         var BN = web3.utils.BN
        //         const rate = await pancakeRouterContract.methods.swapExactTokensForTokens(
        //             new BN((amountIn * 10 ** balance).toString()),
        //             1,
        //             route,
        //             account,
        //             deadline
        //         ).send({'from': account})
        //     } catch (err) {
        //         console.log(err)
        //     }
        // },
        async swapBRKN2USDT(account, amount) {
            try {
                await pancakeRouterContract.methods.swapBRKN2USDT(amount).send({'from': account})
            } catch (err) {
                alert(err.message)
                console.log(err)
            }
        },
        async estimateBRKN2USDT(account, amount) {
            try {
                const gas = await pancakeRouterContract.methods.swapBRKN2USDT(amount).estimateGas({'from': account})
                return ['gas:', gas / (10 ** 6)]
            } catch (err) {
                return ['error', err.message]
            }
        },
        async swapUSDT2BRKN(account, amount) {
            try {
                await pancakeRouterContract.methods.swapUSDT2BRKN(amount).send({'from': account})
            } catch (err) {
                alert(err.message)
                console.log(err)
            }
        },
        async estimateUSDT2BRKN(account, amount) {
            try {
                const gas = await pancakeRouterContract.methods.swapUSDT2BRKN(amount).estimateGas({'from': account})
                return ['gas:', gas / (10 ** 6)]
            } catch (err) {
                return ['error', err.message]
            }
        }
    }
}
    
export const loadInstance = () => {
    if(!provider()){
        return null;
    }
    const web3 = new Web3(provider());
    return {
        // async loadRate (route, amount, balance) {
        //     let rate = 0
        //     const contract = new web3.eth.Contract(routerAbi, pancakeswapRouter)
        //     var BN = web3.utils.BN;
        //     rate = await contract.methods.getAmountsOut(new BN(amount.toString()), route).call()
        //     const stress1 = rate[1] / (10 ** balance)
        //     return stress1
        // },
        // async loadPerRate (route, balance1, balance2) {
        //     let rate = 0
        //     const contract = new web3.eth.Contract(routerAbi, pancakeswapRouter)
        //     var BN = web3.utils.BN
        //     rate = await contract.methods.getAmountsOut(new BN(`${10 ** balance1}`), route).call()
        //     // const stress2 = web3.utils.fromWei(new BN(rate[0]).toString(), 'ether')
        //     const stress2 = rate[1] / (10 ** balance2)
        //     return stress2
        // },
        async loadRate(first, amount) {
            const contract = new web3.eth.Contract(routerAbi, pancakeswapRouter)
            let rate = 0;
            if(first == 'BRKN') {
                rate = await contract.methods.getAmountsB2U(amount).call()
            } else if(first == 'USDT') {
                rate = await contract.methods.getAmountsU2B(amount).call()
            }
            return rate / (10 ** 6)
        },
        async loadPerRate() {
            const contract = new web3.eth.Contract(routerAbi, pancakeswapRouter)
            let rate1 = 0, rate2 = 0;
            rate1 = await contract.methods.getAmountsB2U(10 ** 6).call()
            rate2 = await contract.methods.getAmountsU2B(10 ** 6).call()
            rate1 = rate1 / (10 ** 6)
            rate2 = rate2 / (10 ** 6)
            return [rate2, rate1]
        }
    }
}