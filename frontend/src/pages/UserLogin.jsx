import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const UserLogin = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (state === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        data = response.data;
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        data = response.data;
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login Success!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl min-h-[500px] relative overflow-hidden">
        {/* Form Container */}
        <motion.div
          className={`absolute w-1/2 h-full flex flex-col items-center justify-center ${
            state === "Sign Up" ? "right-0" : "left-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={onSubmitHandler}
            className="bg-white flex flex-col items-center justify-center p-4 h-full text-center w-full"
          >
            <h1 className="font-bold text-2xl mb-4">
              {state === "Sign Up" ? "Sign Up" : "Sign In"}
            </h1>
            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 border-none p-3 my-2 w-full rounded"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 border-none p-3 my-2 w-full rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 border-none p-3 my-2 w-full rounded"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-primary text-white py-2 px-8 uppercase tracking-wider mt-4"
            >
              {state === "Sign Up" ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </motion.div>

        {/* Switch Button */}
        <motion.div
          className="absolute flex flex-col top-0 items-center justify-center p-6 h-full w-1/2 text-center bg-primary transition-transform duration-500"
          initial={{ x: 0 }}
          animate={{ x: state === "Sign Up" ? "0%" : "100%" }}
          transition={{ duration: 0.1 }}
          style={{ zIndex: 10 }}
        >
          <div>
            {state === "Sign Up" ? (
              <div>
                <p className="text-white font-bold text-4xl">Welcome Back!</p>
                <p className="text-white text-sm">To keep connected with us please</p>
                <p className="text-white text-sm">login with your personal info</p>
              </div>
            ) : (
              <div >
                <p className="text-white font-bold text-4xl">Hello!</p>
                <p className="text-white text-sm">Enter your details and start</p>
                <p className="text-white text-sm">your journey with us</p>
              </div>
            )}
          </div>
          <button
            className="rounded-full text-white border-2 border-white py-2 px-6 uppercase mt-4"
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-white mt-6">Doctor Login ? <span onClick={() => navigate("/doc-login")} className="cursor-pointer underline hover:text-green-500">click here</span></p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
