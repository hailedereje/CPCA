import React from "react";
import { useSelector } from "react-redux";

function ProtectedRoute({ element, role, ...rest }) {
  const user = useSelector((state) => state.userState.user);
    if(!user) {
        return 
    }
  return <div></div>;
}

export default ProtectedRoute;
