import React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";

const NavBar = (props) => {
    const { walletConnected, account, onWalletConnect, balance } = props;

    return (
        <nav className="flex justify-between items-center mb-4">
            <Link to="/"><img style={{ width: '50%' }} src="images/logo.png" alt="" className="logo" /></Link>
            <ul className="flex space-x-6 mr-6 text-lg">
                <li>
                    {!walletConnected && account === "" ? 
                        <button onClick={onWalletConnect} className="hover:text-gray-200 bg-laravel text-white px-4 py-2">
                            Connect
                        </button>
                     :
                        <button className="hover:text-gray-200 bg-laravel text-white px-4 py-2">
                            {account} {" "} 
                            <span className="bg-green-500 px-4 py-2 rounded font-bold">
                                {balance !== null ? 
                                    ethers.utils.formatUnits(balance)
                                :
                                    0
                                }
                                EDUFI
                            </span>
                        </button>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;