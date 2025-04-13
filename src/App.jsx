import {useEffect, useState} from "react";
import "./App.css";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // authService.createAccount({
    //   name: "harish",
    //   email: "abc@gmail.com",
    //   password: "abc",
    // });
    authService
      .getCurrentUser()
      .then((userData) => {
        console.log(userData);
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <p className="font-bold text-3xl">Todo</p>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
