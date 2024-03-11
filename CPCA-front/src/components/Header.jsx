import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex gap-x-6 justify-end items-center">
      <Link to="/login" className="link link-hover text-xs sm:text-sm">
        Sign in / Guest
      </Link>
      <Link to="/register" className="link link-hover text-xs sm:text-sm">
        Create Account
      </Link>
    </div>
  );
}

export default Header;
