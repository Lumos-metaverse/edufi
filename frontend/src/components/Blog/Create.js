import React, { Fragment, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Create = (props) => {
    const { onPublishBlog, loading } = props;

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredContent, setEnteredContent] = useState('');

    const history = useHistory();

    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value);
    }

    const contentChangeHandler = (e) => {
        setEnteredContent(e.target.value);
    }

    const blogSubmitHandler = async (e) => {
        e.preventDefault();
        await onPublishBlog(enteredTitle, enteredContent);

        history.push("/");
    }

    return (
        <Fragment>
            <main className="mb-40">
                <div className="mx-4">
                    <div
                        className="bg-gray-50 border border-gray-200 p-10 rounded max-w-2xl mx-auto mt-24"
                    >
                        <header className="text-center">
                            <h2 className="text-2xl font-bold uppercase mb-1">
                                Post something
                            </h2>
                            <p className="mb-4">Post an article and get rewarded for your efforts.</p>
                        </header>

                        <form onSubmit={blogSubmitHandler}>
                            <div className="mb-6">
                                <label htmlFor="title" className="inline-block text-lg mb-2">Post Title</label>
                                <input
                                    type="text"
                                    className="border border-gray-200 rounded p-2 w-full"
                                    name="title"
                                    placeholder="Use an attention catchy title"
                                    onChange={titleChangeHandler}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="content" className="inline-block text-lg mb-2">Content</label>
                                <textarea
                                    style={{ resize: "none" }}
                                    className="border border-gray-200 rounded p-2 w-full"
                                    name="content"
                                    rows="10"
                                    placeholder="We would love to hear your story..."
                                    onChange={contentChangeHandler}
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                {loading ? 
                                
                                    <p>Publishing content...</p> : 
                                
                                    <>
                                        <button className="bg-laravel text-white rounded py-2 px-4 hover:bg-black">Publish your story</button>

                                        <Link to="/" className="text-black ml-4"> Back </Link>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}

export default Create;