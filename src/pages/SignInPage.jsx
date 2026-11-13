import { useState } from "react";
import API_URL from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed Please try again ");
      }

      setSuccess(true);
      console.log("User loggedIn successfully", data);
      login();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#09090f] px-4 py-10">
      {/* Background Effects */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[130px]"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 space-y-7 bg-white/4 border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col">
        {/* Logo */}
        <img
          src="/MeTube Red Ribbon Logo.png"
          alt=""
          className="w-40 self-center object-contain drop-shadow-[0_0_25px_rgba(229,9,53,0.25)]"
        />
        {/* Error and Success Messages */}
        {error && (
          <div className="w-full p-4 mb-4 text-sm font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-md">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full p-4 mb-4 text-sm font-semibold text-green-500 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-md">
            Logged In successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handLogin} className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your Email"
              value={loginData.username}
              onChange={handleChange}
              required
              className="w-full p-4 text-white placeholder-gray-500 bg-white/5 border border-white/10 rounded-xl outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/8 focus:ring-4 focus:ring-red-500/10 hover:border-white/20"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="create password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full p-4 text-white placeholder-gray-500 bg-white/5 border border-white/10 rounded-xl outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/8 focus:ring-4 focus:ring-red-500/10 hover:border-white/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold tracking-wide shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading & Authenticating..." : "LogIn"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
