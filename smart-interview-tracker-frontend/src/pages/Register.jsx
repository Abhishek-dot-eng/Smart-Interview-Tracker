import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      await registerUser(user);

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6">

      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-[#111827]">

        <div className="grid lg:grid-cols-2">

          {/* Left Side */}

          <div className="flex items-center justify-center p-10">

            <form
              onSubmit={register}
              className="w-full max-w-md"
            >

              <h1 className="text-4xl font-bold text-white mb-3">
                Create Account
              </h1>

              <p className="text-slate-400 mb-10">
                Create your account to start managing interviews and reminders.
              </p>

              <div className="mb-5">
                <label className="block text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#1E293B] border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-slate-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#1E293B] border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#1E293B] border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl text-white font-semibold"
              >
                Create Account
              </button>

              <p className="text-center text-slate-400 mt-6">
                Already have an account?{" "}
                <span
                  className="text-blue-400 hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>

            </form>

          </div>

          {/* Right Side */}

          <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#020617]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563EB22,transparent_70%)]"></div>

            <div className="relative text-center z-10">

              <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(37,99,235,0.5)]">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75A3.75 3.75 0 1112 3a3.75 3.75 0 013.75 3.75zM4.5 20.25a7.5 7.5 0 0115 0"
                  />
                </svg>

              </div>

              <h2 className="text-white text-3xl font-bold mt-10">
                Join Interview Tracker
              </h2>

              <p className="text-slate-400 mt-4 max-w-xs mx-auto">
                Keep all your job applications, interviews, reminders, and progress organized in one place.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;