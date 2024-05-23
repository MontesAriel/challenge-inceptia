import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/user/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const email = emailField.current?.value;
    const password = passwordField.current?.value;

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("https://admindev.inceptia.ai/api/v1/login/", data);
      const user = response.data;

      if (user.email === email && password === "4eSBbHqiCTPdBCTj") {
        dispatch(setUser({
          email: user.email,
          fullName: `${user.first_name} ${user.last_name}`,
          token: user.token,
        }));
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  if (loading) {
    return <Loader />; // Display loader while loading
  }

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm">
        <form className="w-full p-8" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              ref={emailField}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              ref={passwordField}
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
