import React from "react";
import LogoutBtn from "../Footer/LogoutBtn";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Container from "../Container/Container";
import Logo from "../Logo";
import Button from "../Button";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Logout",
      slug: "/logout",
      active: !authStatus,
    },
    {
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) => {
              return item.active ? (
                <div key={item.slug}>
                  <li className="">
                    <Button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                      {item.name}
                    </Button>
                  </li>
                </div>
              ) : null;
            })}
          </ul>
          {authStatus && <LogoutBtn />}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
