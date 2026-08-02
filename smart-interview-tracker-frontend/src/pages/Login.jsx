import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6">

      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-[#111827]">

        <div className="grid lg:grid-cols-2">

          {/* Left Side */}

          <div className="flex items-center justify-center p-10">

            <form
              onSubmit={handleLogin}
              className="w-full max-w-md"
            >

              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome Back
              </h1>

              <p className="text-slate-400 mb-10">
                Login to your account and continue tracking your interviews.
              </p>

              <div className="mb-5">
                <label className="block text-slate-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#1E293B] border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-[#1E293B] border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* <div className="flex justify-between items-center text-sm mb-8">

                <label className="flex items-center gap-2 text-slate-400">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>

              </div> */}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl text-white font-semibold"
              >
                Login
              </button>

              <p className="text-center text-slate-400 mt-6">
                Don't have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>

            </form>

          </div>

          {/* Right Side */}

          <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#020617]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563EB22,transparent_70%)]"></div>

            <div className="relative text-center z-10">

              <div className="mx-auto w-32 h-48 border-4 border-slate-500 rounded-lg bg-slate-900 shadow-[0_0_50px_rgba(37,99,235,0.45)]">
              </div>

              <h2 className="text-white text-3xl font-bold mt-10">
                Interview Tracker
              </h2>

              <p className="text-slate-400 mt-4 max-w-xs">
                Organize your interviews, stay prepared, and land your dream job.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;