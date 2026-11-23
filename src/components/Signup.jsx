import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import LanguageSwitcher from "../components/LanguageSwitcher";

function Signup() {
  const { t } = useTranslation();

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
      setError(t("passwordsDoNotMatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("passwordTooShort"));
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );

      await sendEmailVerification(userCredential.user);

      await signOut(auth);

      setSuccess(t("accountCreatedVerification"));

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      if (auth.currentUser) {
        await signOut(auth).catch(console.error);
      }

      if (error.code === "auth/email-already-in-use") {
        setError(t("emailAlreadyExists"));
      } else if (error.code === "auth/invalid-email") {
        setError(t("invalidEmail"));
      } else if (error.code === "auth/weak-password") {
        setError(t("weakPassword"));
      } else if (error.code === "auth/too-many-requests") {
        setError(t("tooManyRequests"));
      } else {
        setError(t("signupError"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="mb-8 text-center">
          <img
            src="/taskcard-logo.png"
            alt="TaskCard"
            className="mx-auto h-20 w-auto"
          />

          <h1 className="mt-2 text-3xl font-bold text-slate-800">
            {t("teacherTaskCard")}
          </h1>

          <p className="mt-2 text-slate-500">{t("createTeacherAccount")}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {t("email")}
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
            {t("password")}
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          />

          <label className="mb-2 mt-5 block text-sm font-medium text-slate-700">
            {t("confirmPassword")}
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("confirmPassword")}
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
            {loading ? t("creatingAccount") : t("createAccount")}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          {t("alreadyHaveAccount")}
        </button>
      </div>
    </div>
  );
}

export default Signup;
