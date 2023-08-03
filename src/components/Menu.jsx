import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();


  const logOut = async () => {
    await axios.post(
      "http://localhost:6969/users/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToProfile = () => {
    navigate("/profile", { state: user });
  };

  const navigateToChat = () => {
    navigate("/chat");
  };

  async function getUser() {
    const { data } = await axios.get("http://localhost:6969/users/login", {
      withCredentials: true,
    });
    setUser(data.user);
  }

  const [charForm, setCharForm] = useState({
    name: "",
    race: "",
    class: "",
    level: 1,
  });

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setCharForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        onClick={navigateToChat}
        className="block md:inline-block px-3 py-2 rounded-md hover:text-rose-300 focus:outline-none focus:text-rose-300"
      >
        Chat
      </a>
      <a
        onClick={() => setShowModal(true)}
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

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-rose-700 to-red-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">My Character Sheet</h3>
                  <button
                    className="text-center p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" flex justify-center items-center bg-transparent text-white h-6 w-6 text-2xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="flex flex-col ">
                    <label className="text-lg font-semibold">Name</label>
                    <input
                      className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                      type="text"
                      name="name"
                      value={charForm.name}
                      placeholder="Name"
                      onChange={handle_input_change}
                    />

                    <label className="text-lg font-semibold">Race</label>
                    <input
                      className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                      type="text"
                      name="race"
                      value={charForm.race}
                      placeholder="Race"
                      onChange={handle_input_change}
                    />

                    <label className="text-lg font-semibold">Class</label>
                    <input
                      className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                      type="text"
                      name="class"
                      value={charForm.class}
                      placeholder="Class"
                      onChange={handle_input_change}
                    />

                    <label className="text-lg font-semibold">Level</label>
                    <input
                      className="border-2 text-black border-rose-500 rounded-md p-2 mb-2"
                      type="number"
                      name="level"
                      value={charForm.level}
                      placeholder="1"
                      onChange={handle_input_change}
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center pt-1 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white active:bg-primary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
