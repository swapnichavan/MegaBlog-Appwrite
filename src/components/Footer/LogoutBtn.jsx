import React from "react";
import {useDispatch} from "react-redux";
import authService from "../../appwrite/auth";
import {logout} from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutBtn;
