import "./AboutPage.css";
import { Link, useParams } from "react-router-dom";
function AboutPage({}) {
  const { id } = useParams();

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

