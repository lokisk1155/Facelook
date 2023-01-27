import { Link, useParams } from "react-router-dom";
function AboutPageLinks({}) {
  const { id } = useParams();

  return (
    <>
      <h3>About</h3>
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
        <button style={{ width: "90%", height: "90%", textDecoration: "none" }}>
          Overview
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
        <button style={{ width: "90%", height: "90%", textDecoration: "none" }}>
          Work and Education
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
        <button style={{ width: "90%", height: "90%", textDecoration: "none" }}>
          Contact Info
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
        <button style={{ width: "90%", height: "90%", textDecoration: "none" }}>
          Family and Relationships
        </button>
      </Link>
    </>
  );
}

export default AboutPageLinks;
