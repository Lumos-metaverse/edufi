import React, { Fragment, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Contract, ethers, providers } from "ethers";
import Web3Modal from "web3modal";

import Home from './components/Home/Home';
import NavBar from './components/Common/NavBar';
import Footer from './components/Common/Footer';
import Create from './components/Blog/Create';
import {
    BLOG_CONTRACT_ABI,
    BLOG_CONTRACT_ADDRESS,
} from "./constants";

function App() {
  const NETWORK = "sepolia";
  const CHAIN_ID = 11155111;

  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);
  const web3ModalRef = useRef();

  // Helper function to fetch a Provider instance from Metamask
  const getProvider = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const getSigner = web3Provider.getSigner();

    const { chainId } = await web3Provider.getNetwork();

    setAccount(await getSigner.getAddress());
    setWalletConnected(true)


    if (chainId !== CHAIN_ID) {
    window.alert(`Please switch to the ${NETWORK} network!`);
      throw new Error(`Please switch to the ${NETWORK} network`);
    }
    setProvider(web3Provider);
  };

  // Helper function to fetch a Signer instance from Metamask
  const getSigner = async () => {
    const web3Modal = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(web3Modal);

    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== CHAIN_ID) {
    window.alert(`Please switch to the ${NETWORK} network!`);
      throw new Error(`Please switch to the ${NETWORK} network`);
    }
    
    const signer = web3Provider.getSigner();
    return signer;      
  };

  // Helper function to return a Blog Contract instance
  // given a Provider/Signer
  const getBlogContractInstance = (providerOrSigner) => {
    return new Contract(
      BLOG_CONTRACT_ADDRESS,
      BLOG_CONTRACT_ABI,
      providerOrSigner
    );
  };

  // Helper function to connect wallet
  const connectWallet = async () => {
    try {
      web3ModalRef.current = new Web3Modal({
        network: NETWORK,
        providerOptions: {},
        disableInjectedProvider: false,
      });

      await getProvider();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const contract = getBlogContractInstance(provider);
      const blogs = await contract.allBlogs();
      setBlogs(blogs);
    } catch (error) {
      console.error(error);
    }
  }

  const publishBlogHandler = async (enteredTitle, enteredContent) => {
    try {
      const signer = await getSigner();
      const contract = getBlogContractInstance(signer);
      const txn = await contract.createBlog(enteredTitle, enteredContent);

      setLoading(true);
      await txn.wait();
      await fetchAllBlogs();

      const tokenBalance = await contract.balanceOf(account);
      setBalance(tokenBalance);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      if(account && provider){
        await fetchAllBlogs();

        const contract = getBlogContractInstance(provider);
        const tokenBalance = await contract.balanceOf(account);
        setBalance(tokenBalance);
      }
    }

    fetchBlogs();
  }, [account, provider]);

  useEffect(() => {
    if(!walletConnected) {
      connectWallet();
    }
  }, [walletConnected, connectWallet]);

  return (
    <Router>
      <Fragment>
        <NavBar balance={balance} onWalletConnect={connectWallet} account={account} walletConnected={walletConnected} />
        <Switch>
          <Route exact path='/'>
            <Home onWalletConnect={connectWallet} walletConnected={walletConnected} blogs={blogs} />
          </Route>
          <Route exact path='/create'>
            <Create walletConnected={walletConnected} loading={loading} onPublishBlog={publishBlogHandler} />
          </Route>
        </Switch>
        <Footer onWalletConnect={connectWallet} walletConnected={walletConnected} />
      </Fragment>
    </Router>
  );
}

export default App;
