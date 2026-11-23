import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import LanguageSwitcher from "../components/LanguageSwitcher";

function Login() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  function getAuthErrorMessage(error) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      return t("incorrectCredentials");
    }

    if (error.code === "auth/invalid-email") {
      return t("invalidEmail");
    }

    if (error.code === "auth/too-many-requests") {
      return t("tooManyRequests");
    }

    if (error.code === "auth/operation-not-allowed") {
      return t("emailVerificationUnavailable");
    }

    return t("generalError");
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

        setError(t("emailNotVerified"));
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
      setError(t("enterEmailAndPassword"));
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
        setSuccess(t("alreadyVerified"));
        return;
      }

      await sendEmailVerification(userCredential.user);

      setSuccess(t("verificationEmailSent"));
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
      setError(t("enterEmailFirst"));
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess(t("passwordResetSent"));
    } catch (error) {
      console.error("PASSWORD RESET ERROR:", error);
      setError(getAuthErrorMessage(error));
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

          <p className="mt-2 text-slate-500">{t("signInPrompt")}</p>
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
            {loading ? t("signingIn") : t("login")}
          </button>

          <button
            type="button"
            onClick={handleResendVerification}
            disabled={loading || resending}
            className="mt-4 w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {resending ? t("sendingVerification") : t("resendVerification")}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            {t("forgotPassword")}
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/signup";
            }}
            className="mt-4 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            {t("newTeacher")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
