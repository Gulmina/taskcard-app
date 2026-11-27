
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

function FeedbackForm({ user }) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
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

      const submitFeedback = httpsCallable(functions, "submitFeedback");

      await submitFeedback({ name, email, category, message });

      setStatus("success");
      setName("");
      setEmail(user?.email || "");
      setCategory("Suggestion");
      setMessage("");

      setTimeout(() => {
        setIsOpen(false);
        setStatus("");
      }, 1800);
    } catch (error) {
      console.error("Feedback submission error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* FLOATING FEEDBACK BUTTON */}

      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setStatus("");
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:bg-slate-700"
      >
        <span className="text-lg">✉</span>
        <span>{t("feedbackTitle")}</span>
      </button>

      {/* FEEDBACK POPUP */}

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          <div className="flex items-center justify-between bg-slate-800 px-5 py-4 text-white">
            <div>
              <h2 className="font-bold">{t("feedbackTitle")}</h2>
              <p className="mt-1 text-xs text-slate-300">
                {t("feedbackDescription")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("close")}
              className="rounded-lg px-2 py-1 text-2xl text-white hover:bg-slate-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-3 overflow-y-auto p-5">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("feedbackName")}
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={100}
                placeholder={t("feedbackNamePlaceholder")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("feedbackEmail")}
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("feedbackCategory")}
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="Suggestion">{t("feedbackSuggestion")}</option>
                <option value="Feature Request">{t("feedbackFeature")}</option>
                <option value="Bug Report">{t("feedbackBug")}</option>
                <option value="Other">{t("feedbackOther")}</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("feedbackMessage")}
              </label>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                maxLength={5000}
                rows={4}
                placeholder={t("feedbackMessagePlaceholder")}
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
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
              className="w-full rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? t("feedbackSending") : t("feedbackSend")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default FeedbackForm;
