import React, { useRef, useState } from "react"; // This can be omitted if you're using React 17+ with the new JSX Transform and don't use React explicitly in the file.
import "./style.css";

const ImageGenerator = () => {
    const defaultImage = 'https://raw.githubusercontent.com/robinahunter/AI-Image-Generator/main/src/assets/default-image-ai-generator.jpg';

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async () =>{
        if (inputRef.current.value==="") {
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        // console.log(data);
        let data_array = data.data;
        setImage_url(data_array[0].url);
    }

    return (
        <>
        <div className="ai-image-generator">
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={ image_url==="/"?defaultImage:image_url } alt="" /></div></div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef}className='search-input' placeholder='Describe the image you want to see' />
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
        </>
    );
}

export default ImageGenerator;
