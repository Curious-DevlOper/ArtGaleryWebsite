import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    console.log("Register component mounted");
  }, []); // Runs once when the component mounts

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "password2") setPassword2(value);
    else if (name === "role") setRole(value);

    console.log(name, value); // Logs form field changes
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // Create user payload
    const user = {
      name,
      email,
      password,
      password2,
      role,
    };

    try {
      // API call to register the user
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.email || "Registration failed. Please try again.");
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);

      // Redirect user to the login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err.message);
      setError(err.message); // Display error to the user
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Register</h1>
            <p className="lead text-center">Create your account</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={registerHandler}>
              <div className="mb-3">
                <input
                  type="name"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password2"
                  className="form-control form-control-lg"
                  placeholder="Repeat Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select form-control-lg"
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-info w-100 mt-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
