import { useEffect, useState } from 'react'
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


    // if (renderString === 'overview') {
    //     overview = true 
    //     placesLived = false 
    // } else if (renderString === 'placesLived') {
    //     overview = false 
    //     placesLived = true 
    // }

    // const preventDoubleRender = (state, func) => {
    //     func(!state)
    // }

    // const handleRender = (action) => {
    //     let value;
    //     switch (action) {
    //         case "overview":
    //             value = <PlacesLived />
    //             return
    //         case "placesLived":
    //             value = <Overview />
    //             return
    //     }
    //     return value 
    // }

   

   
    function altOverview() {
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomWorkEd(false)
        setWorkEd(false)
    }

    function altWorkEd() {
        setCustomPlacesLived(false)
        setPlacesLived(false)
        setCustomOverview(false)
        setOverview(false)
    }

    function altPlacesLived() {
        setCustomOverview(false)
        setOverview(false)
        setCustomWorkEd(false)
        setWorkEd(false)
    }


    return (
        <div className="about-page-container" >
            <div className='about-page-block'>
                <div className='about-page-button-container'>
                    <button tabIndex="1" className='about-page-button-style' onClick={(() => {
                        setCustomOverview(!customOverview)
                        setOverview(customOverview)
                        altOverview()
                    })}>Overview</button>
                    <button tabIndex="2" className='about-page-button-style' onClick={(() => {
                        setCustomWorkEd(!customWorkEd)
                        setWorkEd(customWorkEd)
                        altWorkEd()

                    })}>Work and Education</button>
                    <button tabIndex="3" className='about-page-button-style' onClick={(() => {
                        setCustomPlacesLived(!customPlacesLived)
                        setPlacesLived(customPlacesLived)
                        altPlacesLived() 
                    })}>Places Lived</button>
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