import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      // Store the token in localStorage or a state management solution of your choice
      // For simplicity, we'll store it in localStorage
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p>
        Use the following predefined credentials for testing:
        <br />
        Email: {predefinedEmail}
        <br />
        Password: {predefinedPassword}
      </p>
    </div>
  );
};

export default LoginPage;
