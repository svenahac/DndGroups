import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function postRegister() {
    axios
      .post("http://localhost:6969/users/register/", {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      })
      .then((res) => {
        console.log("Sent to server...");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      id="LoginPage"
      className="m-0 flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-rose-700 to-red-700"
    >
      <div className="mb-10 text-4xl text-white flex justify-center align-middle items-center">
        Dnd Group Finder
      </div>
      <div className="rounded-xl w-85 h-100 bg-white flex flex-col justify-center items-center ">
        <div className="relative z-0 mb-6 w-72">
          <input
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-red-700 bg-transparent border-0 border-b-2 border-red-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute left-0 text-sm text-red-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 mb-6 w-72">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-red-700 bg-transparent border-0 border-b-2 border-red-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-red-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 mb-6 w-72">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-red-700 bg-transparent border-0 border-b-2 border-red-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-red-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 mb-6 w-72">
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="block py-2.5 px-0 w-full text-sm text-red-700 bg-transparent border-0 border-b-2 border-red-700 appearance-none focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="confirm_password"
            className="peer-focus:font-medium absolute left-0 text-sm text-red-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>
        <div className="w-36 h-10 mb-2 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              postRegister();
            }}
            className="text-white bg-red-700 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2"
          >
            Register
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-red-700 text-sm">Already have an account?</p>
          <button
            className="text-red-700 hover:text-rose-600 font-bold"
            onClick={navigateToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
