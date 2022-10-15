import { useState } from 'react'
import './AboutPage.css'
import Overview from './Overview'
import PlacesLived from './PlacesLived'

function AboutPage({ renderString }) {

    const [overview, setOverview] = useState(true)
    const [customOverView, setCustomOverview] = useState(false)

    const [placesLived, setPlacesLived] = useState(false)
    const [customPlacesLived, setCustomPlacesLived] = useState(false)

    if (renderString === 'overview') {
        overview = true 
        placesLived = false 
    } else if (renderString === 'placesLived') {
        overview = false 
        placesLived = true 
    }


    return (
        <div className="about-page-container" >
            <div className='about-page-block'>
                <div className='about-page-button-container'>
                    <button tabindex="1" className='about-page-button-style'>Overview</button>
                    <button tabindex="2" className='about-page-button-style'>Work and Education</button>
                    <button tabindex="3" className='about-page-button-style'>Places Lived</button>
                    <button tabindex="4" className='about-page-button-style'>Contact Info</button>
                    <button tabindex="5" className='about-page-button-style'>Family and Relationships</button>

                </div>
                    <div className='about-page-component-selector'>
                        {overview && <Overview />}
                        {placesLived && <PlacesLived />}
  
                </div>
            </div>

            

        </div>
    )
}

export default AboutPage