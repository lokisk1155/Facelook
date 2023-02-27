import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StoryShow from "../components/Stories/StoryShow";
import { fetchStories } from "../store/story";
import { useState } from "react";

export default function GetAllStories() {
    const dispatch = useDispatch() 

    const { id } = useParams() 

    const [cashe, setCashe] = useState(null)

    useEffect(() => {
        if (!cashe) {
            dispatch(fetchStories()).then((data) => {
                setCashe(data)
            })
        }
    }, [id])

    return <StoryShow />
}