import React from 'react';

const Hero = (props) => {
    const { walletConnected, onWalletConnect } = props;
    return (
        <section className="relative h-72 bg-laravel flex flex-col justify-center align-center text-center space-y-4 mb-4">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-no-repeat bg-center"></div>

            <div className="z-10">
                <h1 className="text-6xl font-bold uppercase text-white">
                    Edu<span className="text-green-500">Fi</span>
                </h1>
                <p className="text-2xl text-gray-200 font-bold my-4">
                    Create & Read Content to Earn
                </p>

                {!walletConnected && 
                    <div>
                        <button onClick={onWalletConnect} className="inline-block border-2 border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:text-gray-200 hover:border-gray-200">Connect Wallet</button>
                    </div>
                }
            </div>
        </section>
    );
}

export default Hero;