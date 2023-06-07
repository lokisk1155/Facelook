import { useSelector } from "react-redux";
import { getSimpleUsers } from "../../store/simpleUsers";
import NavBar from "../NavBar/NavBar";
import UserIndex from "./UserIndex";

function AllUsersPage() {
  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  if (!simpleUsers || !sessionUser) {
    return null;
  }

  return (
    <>
      <NavBar />
      <section
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "700px",
            backgroundColor: "#fff",
            paddingTop: "25px",
            paddingBottom: "25px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0.5px 3px 1px rgb(228, 228, 228)",
            border: "1px solid rgb(213, 213, 213)",
          }}
        >
          {Object.values(simpleUsers).map((user) => {
            return <UserIndex user={user} />;
          })}
        </div>
      </section>
    </>
  );
}

export default AllUsersPage;
