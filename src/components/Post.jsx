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
    const handleSubmit = async () => {
        // can convert this into a hook for calling backend apis
        const response = await fetch(backend + '/generate-og-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, imageUrl: image })
        });

        const blob = await response.blob();
        console.log("blob", blob);
        const imageUrl = URL.createObjectURL(blob);
        document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
    };


    return (
        <div className="post-page">
            <h1>Create a Post</h1>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Post" />}
            <button onClick={handleSubmit}>generate</button>
        </div>
    );
};

export default Post;
