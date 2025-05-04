import React, {useState, useEffect} from "react";
import {use} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function AuthLayout({children, authentication = true}) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  console.log(authStatus);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);
  return loader ? <p>Loading...</p> : {children};
}

export default AuthLayout;
