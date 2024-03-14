import React from "react"; // This can be omitted if you're using React 17+ with the new JSX Transform and don't use React explicitly in the file.
import "./style.css";

const ImageGenerator = () => {
    const defaultImage = 'https://raw.githubusercontent.com/robinahunter/AI-Image-Generator/main/src/assets/default-image-ai-generator.jpg';

    return (
        <div className="ai-image-generator">
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={ defaultImage } alt="" /></div></div>
        </div>
    );
}

export default ImageGenerator;
