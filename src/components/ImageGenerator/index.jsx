import React, { useRef, useState } from "react"; // This can be omitted if you're using React 17+ with the new JSX Transform and don't use React explicitly in the file.
import "./style.css";

const ImageGenerator = () => {
    const defaultImage = 'https://raw.githubusercontent.com/robinahunter/AI-Image-Generator/main/src/assets/default-image-ai-generator.jpg';

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const imageGenerator = async () =>{
        if (inputRef.current.value==="") {
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
                    "User-Agent":"Chrome",
                    "model": "dall-e-3",
                    "quality": "hd",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    "model": "dall-e-3",
                    "quality": "hd",
                    "size": "1024x1024"
                }),
            }
        );
        let data = await response.json();
        // console.log(data);
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

    return (
        <>
        <div className="ai-image-generator">
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={ image_url==="/"?defaultImage:image_url } alt="" /></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef}className='search-input' placeholder='Describe the image you want to see' />
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
        </>
    );
}

export default ImageGenerator;
