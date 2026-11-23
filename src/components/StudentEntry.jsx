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
import LanguageSwitcher from "../components/LanguageSwitcher";

function StudentEntry({ subjectId }) {
  const { t } = useTranslation();

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
          setError("This class could not be found.");
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
        setError(
          "Could not load the class history. Please check your connection or try again later.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      loadStudentHistory();
    } else {
      setError("Invalid student link.");
      setLoading(false);
    }
  }, [subjectId]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex justify-end">
            <LanguageSwitcher />
          </div>

          <p className="text-gray-500">Loading class history...</p>
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
            Unable to load class
          </h2>

          <p className="mt-3 text-gray-600">{error}</p>
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

          <h1 className="text-3xl font-bold text-slate-800">{subject?.name}</h1>

          <p className="mt-2 text-gray-500">Classwork and homework history</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        {entries.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No class entries have been added yet.
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 text-xl font-semibold text-slate-800">
                {entry.entryDate || "Date unavailable"}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Classwork */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Classwork
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {entry.classwork || "No classwork added."}
                  </p>

                  {entry.classworkPhoto && (
                    <img
                      src={entry.classworkPhoto}
                      alt="Classwork"
                      className="mt-4 max-h-72 w-full rounded-lg border object-contain"
                    />
                  )}
                </section>

                {/* Homework */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Homework
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {entry.homework || "No homework added."}
                  </p>

                  {entry.homeworkPhoto && (
                    <img
                      src={entry.homeworkPhoto}
                      alt="Homework"
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
