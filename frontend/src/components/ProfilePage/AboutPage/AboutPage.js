import { Component, useEffect, useState } from 'react'
import './AboutPage.css'
import Overview from './Overview'
import PlacesLived from './PlacesLived'
import WorkEd from './WorkEd'

function AboutPage() {

    const [overview, setOverview] = useState(false)
    const [customOverview, setCustomOverview] = useState(false)

    const [placesLived, setPlacesLived] = useState(false)
    const [customPlacesLived, setCustomPlacesLived] = useState(false)

    const [workEd, setWorkEd] = useState(false)
    const [customWorkEd, setCustomWorkEd] = useState(false)

    const componentArray = [overview, placesLived, workEd]

    const [emergencyKey, setEmergencyKey] = useState('')

    const [emergencyOverview, setEmergencyOverview] = useState(false)
    const [emergencyPlacesLived, setEmergencyPlacesLived] = useState(false)
    const [emergencyWorkEd, setEmergencyWorkEd] = useState(false)


    function fireEmergency() {
        if (emergencyKey === "overview") console.log('hi overfiew')
        if (emergencyKey === "placesLived") console.log('hi ____places')
        if (emergencyKey === "workEd") console.log('hi worked')

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
        return fireEmergency()
        
    }

    const altWorkEd = (e) => {
        e.preventDefault()
        setCustomWorkEd(true)
        setWorkEd(customWorkEd)
        setEmergencyKey("workEd")
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomOverview(false)
        setOverview(false)
        return fireEmergency()
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
        return fireEmergency()
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
                        {emergencyOverview && <Overview />}
                        {emergencyPlacesLived && <PlacesLived />}
                        {emergencyWorkEd && <WorkEd />}

                        {overview && <Overview />}
                        {placesLived && <PlacesLived />}
                        {workEd && <WorkEd />}
                        
  
                </div>
            </div>

            

        </div>
    )
}

export default AboutPage