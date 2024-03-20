import React from "react";
import { useLoaderData } from "react-router-dom";
import {useSelector} from 'react-redux'; 

export const loader = async () => {
  
  return "hello admin loader";
};

function Admin() {
  console.log(useLoaderData());
  return <div>Admin page goes here</div>;
}

export default Admin;
