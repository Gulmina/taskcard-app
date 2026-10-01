import { useState } from "react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/";
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.code || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    try {
      setError("");

      await sendPasswordResetEmail(auth, email);

      alert("Password reset email sent. Check your email inbox.");
    } catch (error) {
      console.error(error);

      setError("Could not send password reset email.");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            {" "}
            <img
              src="/taskcard-logo.png"
              alt="TaskCard"
              className="h-20 w-auto"
            />
            Teacher TaskCard
          </h1>

          <p className="mt-2 text-slate-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teacher@example.com"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          />

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Forgot password?
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/signup";
            }}
            className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            New teacher? Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
