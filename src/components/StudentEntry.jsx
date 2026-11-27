
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import LanguageSwitcher from "./LanguageSwitcher";

function StudentEntry({ subjectId }) {
  const { t, i18n } = useTranslation();

  const [subject, setSubject] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudentHistory() {
      try {
        setLoading(true);
        setError("");

        // Load the subject document
        const subjectRef = doc(db, "subjects", subjectId);
        const subjectSnapshot = await getDoc(subjectRef);

        if (!subjectSnapshot.exists()) {
          setError("studentClassNotFound");
          return;
        }

        const subjectData = {
          id: subjectSnapshot.id,
          ...subjectSnapshot.data(),
        };

        setSubject(subjectData);

        // Load all entries belonging to this subject and its owner
        const entriesQuery = query(
          collection(db, "dailyEntries"),
          where("subjectId", "==", subjectId),
          where("ownerId", "==", subjectData.ownerId),
        );

        const entriesSnapshot = await getDocs(entriesQuery);

        const history = entriesSnapshot.docs.map((entryDoc) => ({
          id: entryDoc.id,
          ...entryDoc.data(),
        }));

        // Newest entries first
        history.sort((a, b) =>
          (b.entryDate || "").localeCompare(a.entryDate || ""),
        );

        setEntries(history);
      } catch (error) {
        console.error("Error loading student history:", error);
        setError("studentHistoryLoadError");
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      loadStudentHistory();
    } else {
      setError("studentInvalidLink");
      setLoading(false);
    }
  }, [subjectId]);

  // Format date according to selected language
  function formatDate(dateString) {
    if (!dateString) {
      return t("studentDateUnavailable");
    }

    const date = new Date(`${dateString}T00:00:00`);

    const locale = i18n.language.startsWith("de") ? "de-DE" : "en-GB";

    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex justify-end">
            <LanguageSwitcher />
          </div>

          <p className="text-gray-500">
            {t("studentLoadingHistory")}
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex justify-end">
            <LanguageSwitcher />
          </div>

          <h2 className="text-xl font-semibold text-red-600">
            {t("studentUnableToLoad")}
          </h2>

          <p className="mt-3 text-gray-600">{t(error)}</p>
        </div>
      </div>
    );
  }

  // Student class history
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <div className="mb-5 flex justify-end">
            <LanguageSwitcher />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            {subject?.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {t("studentHistoryTitle")}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        {entries.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              {t("studentNoEntries")}
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 text-xl font-semibold text-slate-800">
                {formatDate(entry.entryDate)}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* CLASSWORK */}

                <section>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("classworkLabel")}
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {entry.classwork || t("noClasswork")}
                  </p>

                  {entry.classworkPhoto && (
                    <img
                      src={entry.classworkPhoto}
                      alt={t("classworkPhoto")}
                      className="mt-4 max-h-72 w-full rounded-lg border object-contain"
                    />
                  )}
                </section>

                {/* HOMEWORK */}

                <section>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("homeworkLabel")}
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {entry.homework || t("noHomework")}
                  </p>

                  {entry.homeworkPhoto && (
                    <img
                      src={entry.homeworkPhoto}
                      alt={t("homeworkPhoto")}
                      className="mt-4 max-h-72 w-full rounded-lg border object-contain"
                    />
                  )}
                </section>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}

export default StudentEntry;
