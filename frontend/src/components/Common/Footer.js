import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    const { walletConnected, onWalletConnect } = props;
    return (
        <footer
            className="fixed bottom-0 left-0 w-full flex items-center justify-start font-bold bg-laravel text-white h-24 mt-24 opacity-90 md:justify-center"
        >
            <p className="ml-2">Copyright &copy; 2022, All Rights reserved</p>

            {!walletConnected ? 
                <button onClick={onWalletConnect} className="absolute top-1/3 right-10 bg-black text-white py-2 px-5">Connect Wallet</button>
            :
                <Link to="/create" className="absolute top-1/3 right-10 bg-black text-white py-2 px-5">Post Something</Link>
            }
        </footer>
    )
}

export default Footer;