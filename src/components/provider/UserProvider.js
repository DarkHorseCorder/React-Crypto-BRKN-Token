import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    connectWallet: false,
    setConnectWallet: () => {},
    web3Data: {},
    setWeb3Data: () => {},
});

const UserProvider = ({ children }) => {

    const [connectWallet, setConnectWallet] = useState(false);

    const [web3Data, setWeb3Data] = useState({
        address: "",
        basic: 0,
        amount: 0,
        usdtAmount: 0,
        web3: null,
        provider: null,
        connected: false,
        chainId: 1,
        networkId: 1,
        contract: null
    });

    // useEffect(() => {
    //     loadCurrentcies(web3Data.address)
    // }, [connectWallet, web3Data.address])

    return (
        <UserContext.Provider value={{ 
            connectWallet,
            setConnectWallet,
            web3Data,
            setWeb3Data,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;