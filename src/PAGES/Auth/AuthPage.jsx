import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2 } from "lucide-react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, signup } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password || (!isLogin && !name)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (isLogin) {
      const ok = login(email, password);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    } else {
      const ok = signup(email, password, name);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Dynamic Glow Circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-500/10 border border-green-500 text-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                {isLogin ? "Welcome Back!" : "Account Created!"}
              </h2>
              <p className="text-gray-400 text-sm">
                Redirecting you to checkout your style collections...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8"
            >
              {/* Tabs */}
              <div className="flex border-b border-white/10 pb-4">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setErrorMessage("");
                  }}
                  className={`flex-1 text-center font-bold pb-2 border-b-2 text-sm sm:text-base transition-all duration-300 ${
                    isLogin ? "border-pink-500 text-pink-400" : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setErrorMessage("");
                  }}
                  className={`flex-1 text-center font-bold pb-2 border-b-2 text-sm sm:text-base transition-all duration-300 ${
                    !isLogin ? "border-pink-500 text-pink-400" : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Title */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                  {isLogin ? "Sign In to Glam" : "Create Account"}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  {isLogin ? "Enter your credentials to access your account" : "Join us to save items, track orders and more"}
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2 rounded-xl text-center">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name - Sign Up Only */}
                {!isLogin && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold block pl-1">Full Name</label>
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 transition duration-300">
                      <User size={18} className="text-gray-400 mr-3" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-semibold block pl-1">Email Address</label>
                  <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 transition duration-300">
                    <Mail size={18} className="text-gray-400 mr-3" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs text-gray-400 font-semibold">Password</label>
                    {isLogin && (
                      <span className="text-xs text-pink-400 hover:underline cursor-pointer">
                        Forgot?
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 transition duration-300">
                    <Lock size={18} className="text-gray-400 mr-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-white transition focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </button>
              </form>

              {/* Footer text */}
              <div className="text-center text-xs text-gray-500">
                By continuing, you agree to Neha Garments'{" "}
                <span className="text-pink-400 hover:underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-pink-400 hover:underline cursor-pointer">Privacy Policy</span>.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AuthPage;
