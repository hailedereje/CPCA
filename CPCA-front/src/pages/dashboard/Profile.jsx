import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";

export const action = (store) => {
  return async ({request}) => {
    const formData  = await request.formData(); 
    const data = Object.fromEntries(formData);
    console.log(data);
  }
}

function Profile() {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  // {
  //   username: "Abebe";
  //   email: "abebe@gmail.com";
  //   isAdmin: false;
  //   isInstructor: false;
  //   profileImg: "https://res.cloudinary.com/ddc2e1mzy/image/upload/v1710829762/your_folder_name/logo.jpg";
  //   role: "student";
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4MjEzODZlNTM3MWJkZWU1YzBiZmIiLCJpYXQiOjE3MTE0ODk4MTEsImV4cCI6MTcxNDA4MTgxMX0.Fz1PN4Pw0fwkqsZj3cSGww1KN0n4ABqqAke2cFYnGT4";
  // }
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="card bordered">
        <figure>
          <img src={user.profileImg} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.username}</h2>
          <p>{user.email}</p>
          <div className="badge badge-outline">{user.role}</div>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
