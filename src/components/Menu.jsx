import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const logOut = async () => {
    await axios.post(
      "http://localhost:6969/users/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  async function getUser() {
    const { data } = await axios.get("http://localhost:6969/users/login", {
      withCredentials: true,
    });
    setUser(data.user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-white">
      <a
        href="/home"
        className="active block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        Home
      </a>
      <a
        href="/chat"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300"
      >
        Chat
      </a>
      <a
        href="/char_sheet"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300  focus:outline-none focus:text-rose-300 "
      >
        Char Sheet
      </a>
      <a
        href="/profile"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        {user != undefined ? user.username : "Profile"}
      </a>
      <a
        onClick={logOut}
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        Logout
      </a>
    </div>
  );
};

export default Menu;
