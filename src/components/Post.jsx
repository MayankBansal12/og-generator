import React, { useState } from 'react';

const backend = process.env.BACKEND || "http://localhost:5000"

const Post = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    // for fetching image from backend server
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !content) {
            alert("Title and content are required!")
            return;
        }
        // can convert this into a hook for calling backend apis
        const response = await fetch(backend + '/generate-og-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, imageUrl: image })
        });

        const res = await response.json();
        console.log("res: ", res)

        document.querySelector('meta[property="og:title"]').setAttribute('content', title);
        document.querySelector('meta[property="og:description"]').setAttribute('content', content);
        document.querySelector('meta[property="og:image"]').setAttribute('content', res.url);
    };

    return (
        <form className="post-page" onSubmit={handleSubmit}>
            <h2>Create a Post OG</h2>
            <input className="input" type="text" placeholder="title for the post" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="content for the post" className="input" value={content} onChange={(e) => setContent(e.target.value)} required />

            {image ? <img src={image} alt="Post" className="image-preview" /> : <div className="no-image-preview">No image to preview!</div>}
            <label htmlFor="og-image" className="image-label">{!image ? "Upload a Image (optional)" : "Upload a new image"}</label>
            <input id="og-image" type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
            <button type="submit" onClick={handleSubmit} className="btn">Generate!</button>
        </form>
    );
};

export default Post;
