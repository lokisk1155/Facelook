import { Link, useParams } from "react-router-dom";
import "./AboutLinks.css";

function AboutPageLinks({}) {
  const { id } = useParams();

  return (
    <>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          height: "20%",
          width: "100%",
        }}
        to={`/ProfilePage/${id}/about`}
      >
        <button
          style={{
            width: "90%",
            height: "90%",
            textDecoration: "none",
            border: "none",
            borderRadius: "5px",
            backgroundColor:
              window.location.href ===
              `http://localhost:3000/ProfilePage/${id}/about`
                ? "#1877f2"
                : "#fff",
          }}
        >
          <p
            className="text-inside-about-link-buttons"
            style={{
              fontSize: ".9rem",
              padding: "0",
              margin: "0",
              color:
                window.location.href ===
                `http://localhost:3000/ProfilePage/${id}/about`
                  ? "#fff"
                  : "grey",
            }}
          >
            Overview
          </p>
        </button>
      </Link>

      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          height: "20%",
          width: "100%",
        }}
        to={`/ProfilePage/${id}/about/work_and_education`}
      >
        <button
          style={{
            width: "90%",
            height: "90%",
            textDecoration: "none",
            border: "none",
            borderRadius: "5px",
            backgroundColor:
              window.location.href ===
              `http://localhost:3000/ProfilePage/${id}/about/work_and_education`
                ? "#1877f2"
                : "#fff",
          }}
        >
          <p
            className="text-inside-about-link-buttons"
            style={{
              fontSize: ".9rem",
              padding: "0",
              margin: "0",
              color:
                window.location.href ===
                `http://localhost:3000/ProfilePage/${id}/about/work_and_education`
                  ? "#fff"
                  : "grey",
            }}
          >
            Work and Education
          </p>
        </button>
      </Link>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          height: "20%",
          width: "100%",
        }}
        to={`/ProfilePage/${id}/about/contact_info`}
      >
        <button
          style={{
            width: "90%",
            height: "90%",
            textDecoration: "none",
            border: "none",
            borderRadius: "5px",
            backgroundColor:
              window.location.href ===
              `http://localhost:3000/ProfilePage/${id}/about/contact_info`
                ? "#1877f2"
                : "#fff",
          }}
        >
          <p
            className="text-inside-about-link-buttons"
            style={{
              fontSize: ".9rem",
              padding: "0",
              margin: "0",
              color:
                window.location.href ===
                `http://localhost:3000/ProfilePage/${id}/about/contact_info`
                  ? "#fff"
                  : "grey",
            }}
          >
            {" "}
            Contact Info{" "}
          </p>
        </button>
      </Link>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          height: "20%",
          width: "100%",
        }}
        to={`/ProfilePage/${id}/about/family_and_relationships`}
      >
        <button
          style={{
            width: "90%",
            height: "90%",
            textDecoration: "none",
            border: "none",
            borderRadius: "5px",
            backgroundColor:
              window.location.href ===
              `http://localhost:3000/ProfilePage/${id}/about/family_and_relationships`
                ? "#1877f2"
                : "#fff",
          }}
        >
          <p
            className="text-inside-about-link-buttons"
            style={{
              fontSize: ".9rem",
              padding: "0",
              margin: "0",
              color:
                window.location.href ===
                `http://localhost:3000/ProfilePage/${id}/about/family_and_relationships`
                  ? "#fff"
                  : "grey",
            }}
          >
            {" "}
            Family and Relationships{" "}
          </p>
        </button>
      </Link>
    </>
  );
}

export default AboutPageLinks;
