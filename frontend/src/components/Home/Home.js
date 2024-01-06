import React, { Fragment } from 'react';
import Hero from '../UI/Hero';


const Home = (props) => {
    const { blogs, walletConnected, onWalletConnect } = props;
    return (
        <Fragment>
            <Hero onWalletConnect={onWalletConnect} walletConnected={walletConnected} />
            <main className="mb-40">
                <form action="">
                    <div className="relative border-2 border-gray-100 m-4 rounded-lg">
                        <div className="absolute top-4 left-3">
                            <i
                                className="fa fa-search text-gray-400 z-20 hover:text-gray-500"
                            ></i>
                        </div>
                        <input
                            type="text"
                            name="search"
                            className="h-14 w-full pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                            placeholder="Search EduFi Content"
                        />
                        <div className="absolute top-2 right-2">
                            <button
                                type="submit"
                                className="h-10 w-20 text-white rounded-lg bg-laravel hover:bg-gray-600"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">
                    {blogs !== null && blogs.length > 0 && blogs.map((blog, index) => (
                        <div className="bg-gray-50 border border-gray-200 rounded p-6" key={index}>
                            <div>
                                <h3 className="text-2xl">
                                    <a href="show.html">{blog.title}</a>
                                </h3>
                                <p className="">
                                {blog.content}
                                </p>
                                <div className="text-lg mt-4">
                                    <i className="fa-solid fa-user"></i>{" "} {blog.postedBy}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </Fragment>
    )
}

export default Home;