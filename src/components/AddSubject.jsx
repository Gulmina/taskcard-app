
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddSubject({ onAddSubject, onCancel }) {
  const { t } = useTranslation();

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    onAddSubject(name.trim());
    setName("");
  }

  return (
    <div className="max-w-md rounded-xl bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold">
        {t("addSubject")}
      </h3>

      <form onSubmit={handleSubmit}>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t("subjectName")}
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("subjectPlaceholder")}
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-slate-700"
          >
            {t("createSubject")}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSubject;
