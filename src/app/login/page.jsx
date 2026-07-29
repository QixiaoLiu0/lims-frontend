"use client";
import { useRouter } from "next/navigation";
import {
  Droplet,
  Check,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PageTransition from "@/app/components/PageTransition";
import { useUser } from "@/app/contexts/UserContext";
import logo from "@/assets/sait-logo.png";

export default function Login() {
  const router = useRouter();

  //global status
  const { login } = useUser();

  //local status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (email && password) {
      setIsLoading(true);

      const success = await login({ email, password });

      if (success) {
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        setError(
          "Invalid email or password. Please check the demo credentials below.",
        );
      }
    }
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-4 bg-grid-pattern">
        <div className="w-full max-w-6xl bg-white dark:bg-slate-700/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[680px]">
            {/* Left Side */}
            <div className="bg-[#c0d0df] dark:bg-slate-800 p-6 flex flex-col relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-16">
                <div className="bg-blue-600 p-4 rounded-full">
                  <Droplet className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    WATER SAMPLING LAB111
                  </h1>
                  <p className="text-slate-700 dark:text-slate-200 text-base mt-1">
                    Laboratory access portal.
                  </p>
                </div>
              </div>

              {/* Center Logo and ARIS */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <img
                    src={logo.src}
                    alt="SAIT Logo"
                    className="w-72 h-auto mx-auto mb-2 mix-blend-multiply dark:mix-blend-normal"
                  />

                  <h2 className="text-7xl font-bold text-slate-900 dark:text-slate-100 tracking-wide">
                    ARIS
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-[#262835] p-6 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">
                    Enter your credentials to login
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3 mb-6"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-200 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5 mb-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-semibold text-slate-200 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-slate-800 border-2 border-gray-600 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-0 focus:border-yellow-500 outline-none transition"
                      />

                      {email && (
                        <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block font-semibold text-slate-200 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={e => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 bg-slate-800 border-2 border-gray-600 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-0 focus:border-yellow-500 outline-none transition pr-12"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    whileHover={{ scale: isFormValid && !isLoading ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid && !isLoading ? 0.98 : 1 }}
                    className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold py-4 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                      !isFormValid || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-yellow-400 hover:to-yellow-500"
                    }`}
                  >
                    Sign In
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
