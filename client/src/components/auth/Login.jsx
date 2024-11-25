

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { navigationActions } from "../../store/navigate-slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useSelector((state) => state.navigation.redirect); // Track redirect route

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login component mounted");
  }, []); // Runs once when the component mounts

  // Handle navigation if a redirect is set
  useEffect(() => {
    if (redirect) {
      navigate(redirect); // Navigate to the redirect route
      dispatch(navigationActions.clearRedirect()); // Clear the redirect
    }
  }, [redirect, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      name
    };

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      const { token, role } = data;
      console.log("Extracted role:", role); // Confirm the role is correct

      // Store the token (optional, if needed for further API calls)
      localStorage.setItem("authToken", token);

      // Dispatching the login action with the user and role
      dispatch(
        authActions.login({
          user: { email, role, name },
        })
      );

      console.log("Login successful, user role:", role);

      // Set redirect based on role
      if (role === "admin") {
        console.log("Redirecting to admin dashboard");

        dispatch(navigationActions.setRedirect({ route: "/admin-dashboard" }));
      } else if (role === "artist") {
        console.log("Redirecting to artist dashboard");

        dispatch(navigationActions.setRedirect({ route: "/artist-dashboard" }));
      } else {
        dispatch(navigationActions.setRedirect({ route: "/user-dashboard" }));
      }
      console.log("Login successful, user role:", role);

    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your account</p>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
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
                />
              </div>
              <button type="submit" className="btn btn-info w-100 mt-4">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
