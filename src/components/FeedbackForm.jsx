
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

function FeedbackForm({ user }) {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [category, setCategory] = useState("Suggestion");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!message.trim()) {
      setStatus("error");
      return;
    }

    try {
      setSending(true);

      const submitFeedback = httpsCallable(
        functions,
        "submitFeedback"
      );

      await submitFeedback({
        name,
        email,
        category,
        message,
      });

      setStatus("success");
      setName("");
      setEmail(user?.email || "");
      setCategory("Suggestion");
      setMessage("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("feedbackTitle")}
        </h2>
        <p className="mt-2 text-gray-500">
          {t("feedbackDescription")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("feedbackName")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder={t("feedbackNamePlaceholder")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("feedbackEmail")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength={254}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("feedbackCategory")}
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="Suggestion">{t("feedbackSuggestion")}</option>
            <option value="Feature Request">{t("feedbackFeature")}</option>
            <option value="Bug Report">{t("feedbackBug")}</option>
            <option value="Other">{t("feedbackOther")}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("feedbackMessage")}
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            maxLength={5000}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder={t("feedbackMessagePlaceholder")}
          />
        </div>

        {status === "success" && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {t("feedbackSuccess")}
          </p>
        )}

        {status === "error" && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {t("feedbackError")}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="rounded-lg bg-slate-800 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t("feedbackSending") : t("feedbackSend")}
        </button>
      </form>
    </section>
  );
}

export default FeedbackForm;
