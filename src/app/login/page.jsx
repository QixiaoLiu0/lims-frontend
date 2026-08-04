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
        <div className="w-full max-w-6xl bg-white dark:bg-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[680px]">
            {/* Left Side */}
            <div className="bg-slate-200 dark:bg-slate-900 p-8 flex flex-col relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-16">
                <div className="bg-blue-600 p-4 rounded-full shadow-md">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                    WATER SAMPLING LAB
                  </h1>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 leading-normal">
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
                    className="w-72 h-auto mx-auto mb-4 mix-blend-multiply dark:mix-blend-normal opacity-90"
                  />
                  <h2 className="text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
                    ARIS
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-white dark:bg-slate-800 p-8 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-normal">
                    Enter your credentials to login
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-6"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-800 dark:text-red-300 leading-normal">
                      {error}
                    </p>
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight"
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
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors text-base"
                      />

                      {email && (
                        <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight"
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
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors pr-12 text-base"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
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
                    className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base leading-normal ${
                      !isFormValid || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-yellow-400 hover:to-yellow-500 hover:shadow-lg"
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
