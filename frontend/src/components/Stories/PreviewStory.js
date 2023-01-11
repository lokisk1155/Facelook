import { Redirect } from "react-router-dom"
import { useState } from "react"
import StoryCrop from "../crop/StoryCrop"

function PreviewStory({ file, setFile, url, setUrl }) {

    const [preview, setPreview] = useState(null)
    const [fileSaved, setFileSaved] = useState(null)

    return (
        <> 
        {!fileSaved ? <StoryCrop photoURL={url} setPhotoURL={setUrl} setFile={setFile} fileSaved={setFileSaved} /> 
        : <><div style={{ height: "500px", display: "flex", margin: "10%", marginTop: "100px", marginBottom: "100px"}}>
            <div className="edit-preview-container" style={{ border: "3px solid red", height: "100%", width: "30%"}}>

            </div>
            <div className="preview-container" style={{ width: "70%", height: "100%", border: "3px solid blue"}}>
                <img src={url} style={{height: "25%", width: "25%", justifyContent: "center"}} />
            </div>
        </div>     
        </>}    
        </>
    )

}

export default PreviewStory

