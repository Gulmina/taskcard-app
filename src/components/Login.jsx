import { useState } from "react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  function getAuthErrorMessage(error) {
    if (error.code === "auth/invalid-credential") {
      return "Incorrect email or password.";
    }

    if (error.code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }

    if (error.code === "auth/too-many-requests") {
      return "Too many attempts. Please wait a while and try again.";
    }

    if (error.code === "auth/operation-not-allowed") {
      return "Email verification is currently unavailable. Please check your Firebase Authentication settings.";
    }

    return "Something went wrong. Please try again.";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        await signOut(auth);

        setError(
          "Your email is not verified. Please check your inbox or use the Resend Verification Email button below.",
        );

        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password first.");
      return;
    }

    setResending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await userCredential.user.reload();

      if (userCredential.user.emailVerified) {
        setSuccess("Your email is already verified. You can sign in now.");
        return;
      }

      await sendEmailVerification(userCredential.user);

      setSuccess(
        "A new verification email has been sent. Please check your inbox and spam folder.",
      );
    } catch (error) {
      console.error("RESEND VERIFICATION ERROR:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error("SIGN OUT ERROR:", signOutError);
      }

      setResending(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("PASSWORD RESET ERROR:", error);
      setError(getAuthErrorMessage(error));
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <img
            src="/taskcard-logo.png"
            alt="TaskCard"
            className="mx-auto h-20 w-auto"
          />

          <h1 className="mt-2 text-3xl font-bold text-slate-800">
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

          {success && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || resending}
            className="mt-6 w-full rounded-lg bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleResendVerification}
            disabled={loading || resending}
            className="mt-4 w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {resending
              ? "Sending verification email..."
              : "Resend verification email"}
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
