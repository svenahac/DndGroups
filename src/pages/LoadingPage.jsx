import axios from "axios";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";

export default function LoadingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  async function getUser() {
    const { data } = await axios.get("https://dndb.svenahac.com/users/login", {
      withCredentials: true,
    });
    setIsLoggedIn(data.logged);
    
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!isLoggedIn) return <LoginPage />;

  return <HomePage />;
}
