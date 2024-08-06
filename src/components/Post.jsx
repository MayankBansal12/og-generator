import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
const backend = process.env.BACKEND || "http://localhost:5000"
const placholderImg = "/placeholder.jpg"

const Post = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("")
    const [showOG, setShowOG] = useState("home")
    const ogRef = useRef(null);

    // check local storage for previous generated og image
    useEffect(() => {
        const title = localStorage.getItem("title")
        const content = localStorage.getItem("content")
        const image = localStorage.getItem("image")

        if (title && content && image) {
            setShowOG("image")
            setTitle(title)
            setContent(content)
            setImageUrl(image)
        }
    }, [])

    // upload image for the post
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };

    // on submit show the generated image
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !content || title.length < 10 || content.length < 10) {
            alert("Title and content should of 10 chars atleast!")
            return;
        }

        setShowOG("loading")
        // generate a new image after element has been rendered
        setTimeout(generateImage, 1500)
    };

    // generate og image
    const generateImage = () => {
        toPng(ogRef.current)
            .then(async (dataUrl) => {
                // upload image to cloudinary
                const respnse = await fetch(backend + '/upload-img', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: dataUrl })
                });
                const res = await respnse.json();
                setImageUrl(res.url)
                setTimeout(() => setShowOG("image"), 1000)
                localStorage.setItem("title", title);
                localStorage.setItem("content", content);
                localStorage.setItem("image", res.url);
            })
            .catch((error) => {
                console.error('Error generating image:', error);
            })
    }

    // copy image url
    const copyImageUrl = () => {
        navigator.clipboard.writeText(imageUrl).then(function () {
            console.log('Text copied to clipboard');
        }).catch(function (error) {
            console.error('Error copying text: ', error);
        });
    }

    // reset the page in case of generate new 
    const resetPage = () => {
        localStorage.removeItem("title");
        localStorage.removeItem("content");
        localStorage.removeItem("image");
        setImageUrl("");
        setTitle("")
        setContent("")
        setImage(null)
        setShowOG("home")
    }

    return (
        <>
            {showOG === "home" ?
                <form className="post-page" onSubmit={handleSubmit}>
                    <h2>Create a Post OG</h2>
                    <input className="input" type="text" placeholder="title for the post" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="content for the post" className="input" value={content} onChange={(e) => setContent(e.target.value)} required />

                    {image ? <img src={image} alt="Post" className="image-preview" /> : <div className="no-image-preview">No image to preview!</div>}
                    <label htmlFor="og-image" className="image-label">{!image ? "Upload a Image (optional)" : "Upload a new image"}</label>
                    <input id="og-image" type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
                    <button type="submit" onClick={handleSubmit} className="btn">Generate!</button>
                </form>
                :
                showOG === "loading" ?
                    <>
                        <div className="og-image" ref={ogRef}>
                            <div className="og-img-header">
                                <h1 className="og-img-title">{title?.length > 200 ? title.substring(0, 200) + "..." : title}</h1>
                                <img src={image || placholderImg} alt={title.substring(0, 10)} className="og-img-logo" />
                            </div>
                            <p className="og-img-content">{content?.length > 700 ? content.substring(0, 700) + "..." : content}</p>
                            <div className="og-img-label">{"Read: " + (title?.length > 50 ? title.substring(0, 50) + "..." : title) + " , og-image: by og-generator"}</div>
                        </div>
                        <div className="loading-popup">Generating og image...hold on</div>
                    </>
                    :
                    <div className="post-container">
                        <h2>Generated Image</h2>
                        <img src={imageUrl} alt="generate og image" className="post-image" />
                        <button className="btn" onClick={copyImageUrl}>Copy Image Url</button>
                        <a className="btn" href={imageUrl} target="_blank">View Image</a>
                        <button className="btn" onClick={resetPage}>Generate New OG</button>
                    </div >
            }
        </>
    );
};

export default Post;
