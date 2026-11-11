import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Sign out until the email is verified
      await signOut(auth);

      setSuccess(
        "Account created! Please check your email and click the verification link before signing in. Also check your spam folder.",
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      // Make sure the user is signed out if email sending fails
      if (auth.currentUser) {
        await signOut(auth).catch(console.error);
      }

      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError(
          "Could not create the account or send verification email. Please try again.",
        );
      }
    } finally {
      setLoading(false);
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

          <p className="mt-2 text-slate-500">Create a teacher account</p>
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

          <label className="mb-2 mt-5 block text-sm font-medium text-slate-700">
            Confirm password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
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
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}

export default Signup;
