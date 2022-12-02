import "./EditDetails.css";
import { getCurrent } from "../../store/user";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EditDetails({ closeForm }) {
  const { id } = useParams();

  const currentUser = useSelector(getCurrent(id));

  const handleCloseForm = (e) => {
    e.preventDefault();
    return closeForm(false);
  };

  return (
    <div className="edit-details-modal">
      <div className="edit-details-container">
        <h2 className="edit-details-header">Edit details</h2>
        <button className="edit-details-header" onClick={handleCloseForm}>
          X
        </button>
        <h3>Customize your intro</h3>
        <p>details will be set to public</p>
        <div className="edit-details-work">
          <h4>Work</h4>
          {<p>{currentUser.work}</p> || (
            <Link to={`/ProfilePage/${id}/about/work_and_education`}>
              <button>add a work place</button>
            </Link>
          )}
        </div>

        <div>
          <h4>Education</h4>
          <Link to={`/ProfilePage/${id}/about/work_and_education`}>
            <button>
              From {currentUser.high_school || "Add your hometown"}
            </button>
          </Link>

          <Link to={`/ProfilePage/${id}/about/work_and_education`}>
            <button>From {currentUser.college || "Add your hometown"}</button>
          </Link>
        </div>

        <div>
          <h4>Current City</h4>
          <Link to={`/ProfilePage/${id}/about/places_lived`}>
            <button>
              Lives in {currentUser.location || "Add your current city"}
            </button>
          </Link>
        </div>

        <div>
          <Link to={`/ProfilePage/${id}/about/family_and_relationships`}>
            <h4>Relationship</h4>
            <button>
              {" "}
              {currentUser.relationship || "Add Relationship status"}
            </button>
          </Link>
        </div>

        <div>
          <h4>Joined Facebook</h4>
          <p>Joined on {currentUser.created_at}</p>
        </div>

        <div>
          <Link to={`/ProfilePage/${id}/about/contact_info`}>
            <button>Update your information</button>
          </Link>
          <button onClick={handleCloseForm}>Cancel</button>
          <button onClick={handleCloseForm}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
