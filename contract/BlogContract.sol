// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import './EduFi.sol';

contract BlogContract is EduFi {
    // Create a user defined type to hold blog content
    struct Blog {
        string title;
        string content;
        address postedBy;
    }

    Blog[] public blogs;

    function createBlog(string memory _title, string memory _content) public {
        blogs.push(Blog({title: _title, content: _content, postedBy: msg.sender}));
        mint();
    }

    function blogByIndex(uint _index) public view returns(string memory title, string memory content, address postedBy) {
        Blog storage blog = blogs[_index];

        return (blog.title, blog.content, blog.postedBy);
    }

    function allBlogs() public view returns(Blog[] memory) {
        return blogs;
    }

    function updateBlog(uint _index, string memory newTitle, string memory newContent) public {
        Blog storage blog = blogs[_index];

        blog.title = newTitle;
        blog.content = newContent;
    }

    function deleteBlog(uint _index) public {
        delete blogs[_index];
    }
}