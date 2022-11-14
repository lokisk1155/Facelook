import { useEffect } from "react"
import { setCurrentProfile } from "../../../store/user"
import { useState } from "react"


function ContactInfo({ currentUser }) {

    const [monthName, setMonthName] = useState('')

    useEffect(() => {
        setMonth() 
    }, [])


    function setMonth() {
        switch (currentUser.month) {
            case "1":
                return setMonthName("January")
            case "2":
                return setMonthName("Febuary")
            case "3":
                return setMonthName("March")
            case "4":
                return setMonthName("Apirl")
            case "5":
                return setMonthName("May")
            case "6":
                return setMonthName("June")
            case "7":
                return setMonthName("July")
            case "8": 
                return setMonthName("August")
            case "9":
                return setMonthName("September")
            case "10":
                return setMonthName("October")
            case "11":
                return setMonthName("November")
            case "12":
                return setMonthName("December")
            default:
                return setMonthName("default")
        }
        return 
    }



    return (
        <div>
            <p>{currentUser.email}</p>
            <p>phone number</p>
            <p>{currentUser.gender}</p>
            <p>birth date: {`${monthName} ${currentUser.day}`}</p>
            <p>birth year: {currentUser.year}</p>
        </div>
    )



}

export default ContactInfo