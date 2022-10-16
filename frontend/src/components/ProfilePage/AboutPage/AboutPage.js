import { Component, useEffect, useState } from 'react'
import './AboutPage.css'
import Overview from './Overview'
import PlacesLived from './PlacesLived'
import WorkEd from './WorkEd'

function AboutPage() {

    const falsey = false

    const [overview, setOverview] = useState(true)
    const [customOverview, setCustomOverview] = useState(falsey)

    const [placesLived, setPlacesLived] = useState(falsey)
    const [customPlacesLived, setCustomPlacesLived] = useState(falsey)

    const [workEd, setWorkEd] = useState(falsey)
    const [customWorkEd, setCustomWorkEd] = useState(falsey)

    const componentArray = [overview, placesLived, workEd]

    const [emergencyKey, setEmergencyKey] = useState('')


    useEffect(() => {
        fireEmergency()
    },[overview, placesLived, emergencyKey, workEd])


    function fireEmergency() {
        console.log(emergencyKey)
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
        setCustomOverview(true)
        setOverview(customOverview)
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        let counter = 0
        componentArray.forEach((component) => {
            if (!component) counter += 1
        })
        if (counter === 3) {
            return fireEmergency()
        } 
        return null
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
        let counter = 0
        componentArray.forEach((component) => {
            if (!component) counter += 1
        })
        if (counter === 3) {
            return fireEmergency()
        }
        return 
    }

    const altPlacesLived = (e) => {
        e.preventDefault()
        setCustomPlacesLived(true)
        setPlacesLived(customPlacesLived)
        setEmergencyKey("placesLived")
        setCustomOverview(false)
        setOverview(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        let counter = 0
        componentArray.forEach((component) => {
            if (!component) counter += 1
        })
        if (counter === 3) {
            return fireEmergency()
        }
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
                        {overview && <Overview func={setOverview}/>}
                        {placesLived && <PlacesLived func={setPlacesLived} />}
                        {workEd && <WorkEd func={setWorkEd} />}
                </div>
            </div>

            

        </div>
    )
}

export default AboutPage