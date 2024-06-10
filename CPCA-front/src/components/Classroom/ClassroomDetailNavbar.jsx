import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
  
  const ClassroomNavbar = () => {
    const {user} = useSelector((store) => store.userState);
    let links;
    const instructorLinks = [
      { id: 1, url: "", text: "Details" },
      { id: 3, url: "students", text: "Students" },
      { id: 5, url: "invitations", text: "Invitations" },
      { id: 6, url: "discussions", text: "Discussions" },
    ];
    const studentLinks = [
      { id: 1, url: "", text: "Details" },
      { id: 3, url: "content", text: "Content" },
      { id: 5, url: "progress", text: "Progress" },
      { id: 6, url: "discussions", text: "Discussions" },
    ];
    if (user && user.role === "instructor") {
      links = instructorLinks;
    }
    if (user && user.role === "student") {
      links = studentLinks;
    }
    return (
      <>
          <ul className="menu menu-horizontal">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url} className="capitalize">
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
      </>
    );
  };
  export default ClassroomNavbar;