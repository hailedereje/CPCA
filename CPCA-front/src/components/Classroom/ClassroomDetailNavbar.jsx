import { Link } from "react-router-dom";

const links = [
    { id: 1, url: "", text: "Details" },
    { id: 3, url: "students", text: "Students" },
    { id: 5, url: "invitations", text: "Invitations" },
    { id: 6, url: "discussions", text: "Discussions" },
  ];
  
  const ClassroomNavbar = () => {
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