import { Component, useEffect, useState } from 'react'
import './AboutPage.css'
import Overview from './Overview'
import PlacesLived from './PlacesLived'
import WorkEd from './WorkEd'

function AboutPage({ renderString }) {

    const [overview, setOverview] = useState(true)
    const [customOverview, setCustomOverview] = useState(false)

    const [placesLived, setPlacesLived] = useState(false)
    const [customPlacesLived, setCustomPlacesLived] = useState(false)

    const [workEd, setWorkEd] = useState(false)
    const [customWorkEd, setCustomWorkEd] = useState(false)

    const componentArray = [overview, placesLived, workEd]

    const [emergencyKey, setEmergencyKey] = useState('')

    useEffect(() => {
        fireEmergency()
    },[overview, placesLived, workEd])


    function fireEmergency() {
        switch (emergencyKey) {
            case "overview" :
                setOverview(true)
                setPlacesLived(false)
                setWorkEd(false)
                break
            case "placesLived" :
                setPlacesLived(true)
                setOverview(false)
                setWorkEd(false)
                break
            case "workEd":
                setWorkEd(true)
                setOverview(false)
                setPlacesLived(false)
                break
        }
        return 
    }

    const altOverview = (e) => {
        e.preventDefault()
        setEmergencyKey("overview")
        setCustomOverview(!customOverview)
        setOverview(customOverview)
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        return 
    }

    const altWorkEd = (e) => {
        e.preventDefault()
        setCustomWorkEd(!customWorkEd)
        setWorkEd(customWorkEd)
        setEmergencyKey("workEd")
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomOverview(false)
        setOverview(false)
        return 
    }

    const altPlacesLived = (e) => {
        e.preventDefault()
        setCustomPlacesLived(!customPlacesLived)
        setPlacesLived(customPlacesLived)
        setEmergencyKey("placesLived")
        setCustomOverview(false)
        setOverview(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        return 
    }


    return (
        <div className="about-page-container" >
            <div className='about-page-block'>
                <div className='about-page-button-container'>
                    <button tabIndex="1" className='about-page-button-style' onClick={altOverview}>Overview</button>
                    <button tabIndex="2" className='about-page-button-style' onClick={altWorkEd}>Work and Education</button>
                    <button tabIndex="3" className='about-page-button-style' onClick={altPlacesLived}>Places Lived</button>
                    <button tabIndex="4" className='about-page-button-style'>Contact Info</button>
                    <button tabIndex="5" className='about-page-button-style'>Family and Relationships</button>

                </div>
                    <div className='about-page-component-selector'>
                        {overview && <Overview />}
                        {placesLived && <PlacesLived />}
                        {workEd && <WorkEd />}
                </div>
            </div>

            

        </div>
    )
}

export default AboutPage