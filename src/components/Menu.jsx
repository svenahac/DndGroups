import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const logOut = async () => {
    await axios.post(
      "https://dndb.svenahac.com/users/logout",
      {},
      { withCredentials: true }
    );
    localStorage.setItem("reload", "true");
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToProfile = () => {
    navigate("/profile", { state: user });
  };

  const navigateToCharSheet = () => {
    navigate("/charSheet", { state: user });
  };

  const navigateToMessages = () => {
    navigate("/messages", { state: user });
  };

  async function getUser() {
    const { data } = await axios.get("https://dndb.svenahac.com/users/login", {
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
        onClick={navigateToHome}
        className="active block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300 "
      >
        Home
      </a>
      <a
        onClick={navigateToMessages}
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300"
      >
        Messages
      </a>
      <a
        onClick={navigateToCharSheet}
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300  focus:outline-none focus:text-rose-300 "
      >
        Char Sheet
      </a>

      <a
        onClick={navigateToProfile}
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
