import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const predefinedEmail = "eve.holt@reqres.in"; // Predefined email for testing
  const predefinedPassword = "pistol"; // Predefined password for testing

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const { token } = response.data;
      console.log(response.data);
      localStorage.setItem("token", token);

      // Call the onLogin function passed as a prop with the token
      onLogin(token);

      // Redirect the user to the task manager dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <>
      <Header title="TaskTracker" showSearch={false} />
      <h2 className=" text-center addTask fw-bolder my-3">Sign In</h2>
      <div>
        <form
          onSubmit={handleLogin}
          className="d-flex flex-column  justify-content-center align-items-center"
        >
          <div className="searchForm mb-3 p-3">
            <label>Username: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputText p-2 ms-2 rounded-2"
              placeholder="Enter your Username"
            />
          </div>
          <div className="searchForm p-3">
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputText p-2 ms-2 rounded-2 mx-auto"
                placeholder="Enter your password"
              />
            </label>
          </div>
          {error && <p className="text-danger">{error}*</p>}
          <button type="submit" className="addTaskButton mt-4">
            Login
          </button>
          <div className="mt-5 ">
            <p style={{ color: "#e9f08e" }}>
              Use the following predefined credentials <br /> for testing:
            </p>
            <div>
              <span className="fw-bold me-2" style={{ color: "#447ca4" }}>
                Email:
              </span>
              <span style={{ color: "#c8f1eb" }}> {predefinedEmail}</span>
            </div>
            <div>
              <span className="fw-bold me-2" style={{ color: "#447ca4" }}>
                Password:
              </span>
              <span style={{ color: "#c8f1eb" }}> {predefinedPassword}</span>
            </div>
          </div>
        </form>
      </div>
      <div style={{ width: "100vw" }} className="position-absolute bottom-0 ">
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
