import { Component, useEffect, useState } from 'react'
import { render } from 'react-dom'
import './AboutPage.css'
import Overview from './Overview'
import PlacesLived from './PlacesLived'
import WorkEd from './WorkEd'
import Relationship from './relationship'
import ContactInfo from './ContactInfo'

function AboutPage({ renderString, currentUser }) {

    const [overview, setOverview] = useState(true)
    const [customOverview, setCustomOverview] = useState(false)

    const [placesLived, setPlacesLived] = useState(false)
    const [customPlacesLived, setCustomPlacesLived] = useState(false)

    const [workEd, setWorkEd] = useState(false)
    const [customWorkEd, setCustomWorkEd] = useState(false)

    const [relationship, setRelationship] = useState(false)
    const [customRelationship, setCustomRelationship] = useState(false)

    const [contactInfo, setContactInfo] = useState(false)
    const [customContact, setCustomContact] = useState(false)

    const [emergencyKey, setEmergencyKey] = useState('')

        useEffect(() => {
            handleRenderString()
            fireEmergency()
        },[overview, placesLived, workEd, relationship, contactInfo])

   

        function fireEmergency() {
            switch (emergencyKey) {
                case "overview" :
                    setOverview(true)
                    setPlacesLived(false)
                    setWorkEd(false)
                    setRelationship(false)
                    setContactInfo(false)
                    break
                case "placesLived" :
                    setPlacesLived(true)
                    setOverview(false)
                    setWorkEd(false)
                    setRelationship(false)
                    setContactInfo(false)
                    break
                case "workEd":
                    setOverview(false)
                    setWorkEd(true)
                    setPlacesLived(false)
                    setRelationship(false)
                    setContactInfo(false)
                    break
                case "relationship":
                    setRelationship(true)
                    setOverview(false)
                    setWorkEd(false)
                    setPlacesLived(false)
                    setContactInfo(false)
                    break
                case "contact":
                    setContactInfo(true)
                    setRelationship(false)
                    setOverview(false)
                    setWorkEd(false)
                    setPlacesLived(false)
                    break
            }
    }

    function handleRenderString() {
        switch (renderString) {
            case "overview" :
                setOverview(true)
                setPlacesLived(false)
                setWorkEd(false)
                setRelationship(false)
                setContactInfo(false)
                break
            case "placesLived" :
                setPlacesLived(true)
                setOverview(false)
                setWorkEd(false)
                setRelationship(false)
                setContactInfo(false)
                break
            case "workEd":
                setOverview(false)
                setWorkEd(true)
                setPlacesLived(false)
                setRelationship(false)
                setContactInfo(false)
                break
            case "relationship":
                setRelationship(true)
                setOverview(false)
                setWorkEd(false)
                setPlacesLived(false)
                setContactInfo(false)
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
        setCustomRelationship(false)
        setRelationship(false)
        setContactInfo(false)
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
        setCustomRelationship(false)
        setRelationship(false)
        setContactInfo(false)
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
        setCustomRelationship(false)
        setRelationship(false)
        setContactInfo(false)
        return 
    }

    const altRelationship = (e) => {
        e.preventDefault()
        setCustomRelationship(!customRelationship)
        setRelationship(customRelationship)
        setEmergencyKey("relationship")
        setCustomOverview(false)
        setOverview(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setContactInfo(false)
        return 
    }

    const altContactInfo = e => {
        e.preventDefault() 
        setCustomContact(!customContact)
        setRelationship(customContact)
        setEmergencyKey("contact")
        setCustomOverview(false)
        setOverview(false)
        setCustomWorkEd(false)
        setWorkEd(false)
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomRelationship(false)
        setRelationship(false)
    }


    return (
        <div className="about-page-container" >
            <div className='about-page-block'>
                <div className='about-page-button-container'>
                    <button tabIndex="1" className='about-page-button-style' onClick={altOverview}>Overview</button>
                    <button tabIndex="2" className='about-page-button-style' onClick={altWorkEd}>Work and Education</button>
                    <button tabIndex="3" className='about-page-button-style' onClick={altPlacesLived}>Places Lived</button>
                    <button tabIndex="4" className='about-page-button-style' onClick={altContactInfo}>Contact Info</button>
                    <button tabIndex="5" className='about-page-button-style' onClick={altRelationship}>Family and Relationships</button>

                </div>
                    <div className='about-page-component-selector'>
                        {overview && <Overview currentUser={currentUser}/>}
                        {placesLived && <PlacesLived currentUser={currentUser}/>}
                        {workEd && <WorkEd currentUser={currentUser}/>}
                        {relationship && <Relationship currentUser={currentUser} />}
                        {contactInfo && <ContactInfo currentUser={currentUser}/>}
                </div>
            </div>

            

        </div>
    )
}

export default AboutPage
