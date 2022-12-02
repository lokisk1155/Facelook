import { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import "./AboutPage.css";
import Overview from "./Overview";
import PlacesLived from "./PlacesLived";
import WorkEd from "./WorkEd";
import Relationship from "./relationship";
import ContactInfo from "./ContactInfo";
import { Link, useParams } from "react-router-dom";
import { getCurrent } from "../../../store/user";
import { useSelector } from "react-redux";
function AboutPage({}) {
  //const isUser = currentUser.id === sessionUser.id;

  const { id } = useParams();

  // const [overview, setOverview] = useState(true);
  // const [customOverview, setCustomOverview] = useState(false);

  // const [placesLived, setPlacesLived] = useState(false);
  // const [customPlacesLived, setCustomPlacesLived] = useState(false);

  // const [workEd, setWorkEd] = useState(false);
  // const [customWorkEd, setCustomWorkEd] = useState(false);

  // const [relationship, setRelationship] = useState(false);
  // const [customRelationship, setCustomRelationship] = useState(false);

  // const [contactInfo, setContactInfo] = useState(false);
  // const [customContact, setCustomContact] = useState(false);

  // const [emergencyKey, setEmergencyKey] = useState("");

  // useEffect(() => {
  //   handleRenderString();
  //   fireEmergency();
  // }, [overview, placesLived, workEd, relationship, contactInfo]);

  // function fireEmergency() {
  //   switch (emergencyKey) {
  //     case "overview":
  //       setOverview(true);
  //       setPlacesLived(false);
  //       setWorkEd(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "placesLived":
  //       setPlacesLived(true);
  //       setOverview(false);
  //       setWorkEd(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "workEd":
  //       setOverview(false);
  //       setWorkEd(true);
  //       setPlacesLived(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "relationship":
  //       setRelationship(true);
  //       setOverview(false);
  //       setWorkEd(false);
  //       setPlacesLived(false);
  //       setContactInfo(false);
  //       break;
  //     case "contact":
  //       setContactInfo(true);
  //       setRelationship(false);
  //       setOverview(false);
  //       setWorkEd(false);
  //       setPlacesLived(false);
  //       break;
  //   }
  // }

  // function handleRenderString() {
  //   switch (renderString) {
  //     case "overview":
  //       setOverview(true);
  //       setPlacesLived(false);
  //       setWorkEd(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "placesLived":
  //       setPlacesLived(true);
  //       setOverview(false);
  //       setWorkEd(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "workEd":
  //       setOverview(false);
  //       setWorkEd(true);
  //       setPlacesLived(false);
  //       setRelationship(false);
  //       setContactInfo(false);
  //       break;
  //     case "relationship":
  //       setRelationship(true);
  //       setOverview(false);
  //       setWorkEd(false);
  //       setPlacesLived(false);
  //       setContactInfo(false);
  //       break;
  //   }
  //   return;
  // }

  // const altOverview = (e) => {
  //   e.preventDefault();
  //   setEmergencyKey("overview");
  //   setCustomOverview(!customOverview);
  //   setOverview(customOverview);
  //   setCustomPlacesLived(false);
  //   setPlacesLived(false);
  //   setCustomWorkEd(false);
  //   setWorkEd(false);
  //   setCustomRelationship(false);
  //   setRelationship(false);
  //   setContactInfo(false);
  //   return;
  // };

  // const altWorkEd = (e) => {
  //   e.preventDefault();
  //   setCustomWorkEd(!customWorkEd);
  //   setWorkEd(customWorkEd);
  //   setEmergencyKey("workEd");
  //   setCustomPlacesLived(false);
  //   setPlacesLived(false);
  //   setCustomOverview(false);
  //   setOverview(false);
  //   setCustomRelationship(false);
  //   setRelationship(false);
  //   setContactInfo(false);
  //   return;
  // };

  // const altPlacesLived = (e) => {
  //   e.preventDefault();
  //   setCustomPlacesLived(!customPlacesLived);
  //   setPlacesLived(customPlacesLived);
  //   setEmergencyKey("placesLived");
  //   setCustomOverview(false);
  //   setOverview(false);
  //   setCustomWorkEd(false);
  //   setWorkEd(false);
  //   setCustomRelationship(false);
  //   setRelationship(false);
  //   setContactInfo(false);
  //   return;
  // };

  // const altRelationship = (e) => {
  //   e.preventDefault();
  //   setCustomRelationship(!customRelationship);
  //   setRelationship(customRelationship);
  //   setEmergencyKey("relationship");
  //   setCustomOverview(false);
  //   setOverview(false);
  //   setCustomWorkEd(false);
  //   setWorkEd(false);
  //   setCustomPlacesLived(false);
  //   setPlacesLived(false);
  //   setContactInfo(false);
  //   return;
  // };

  // const altContactInfo = (e) => {
  //   e.preventDefault();
  //   setCustomContact(!customContact);
  //   setRelationship(customContact);
  //   setEmergencyKey("contact");
  //   setCustomOverview(false);
  //   setOverview(false);
  //   setCustomWorkEd(false);
  //   setWorkEd(false);
  //   setCustomPlacesLived(false);
  //   setPlacesLived(false);
  //   setCustomRelationship(false);
  //   setRelationship(false);
  // };

  return (
    <div className="about-page-button-container">
      <Link to={`/ProfilePage/${id}/about`}>
        <button tabIndex="1" className="about-page-button-style">
          Overview
        </button>
      </Link>

      <Link to={`/ProfilePage/${id}/about/work_and_education`}>
        <button tabIndex="2" className="about-page-button-style">
          Work and Education
        </button>
      </Link>

      <Link to={`/ProfilePage/${id}/about/places_lived`}>
        <button tabIndex="3" className="about-page-button-style">
          Places Lived
        </button>
      </Link>
      <Link to={`/ProfilePage/${id}/about/contact_info`}>
        <button tabIndex="4" className="about-page-button-style">
          Contact Info
        </button>
      </Link>
      <Link to={`/ProfilePage/${id}/about/family_and_relationships`}>
        <button tabIndex="5" className="about-page-button-style">
          Family and Relationships
        </button>
      </Link>
    </div>
  );
}

export default AboutPage;
