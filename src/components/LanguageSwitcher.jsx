import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("taskcard-language", language);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
          i18n.language.startsWith("en")
            ? "bg-slate-800 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("de")}
        className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
          i18n.language.startsWith("de")
            ? "bg-slate-800 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        DE
      </button>
    </div>
  );
}

export default LanguageSwitcher;
