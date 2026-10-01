import { useEffect, useState } from "react";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";

import AddSubject from "./AddSubject";
import SubjectCard from "./SubjectCard";
import SubjectEntry from "./SubjectEntry";

function Dashboard({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [entries, setEntries] = useState([]);

  const [showAddSubject, setShowAddSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(false);

  // --------------------------------------------------
  // LOAD TEACHER'S SUBJECTS
  // --------------------------------------------------

  useEffect(() => {
    async function loadSubjects() {
      if (!user?.uid) {
        setSubjects([]);
        setLoadingSubjects(false);
        return;
      }

      try {
        setLoadingSubjects(true);

        const subjectsQuery = query(
          collection(db, "subjects"),
          where("ownerId", "==", user.uid),
        );

        const querySnapshot = await getDocs(subjectsQuery);

        const loadedSubjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubjects(loadedSubjects);
      } catch (error) {
        console.error("Error loading subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    }

    loadSubjects();
  }, [user]);

  // --------------------------------------------------
  // LOAD TEACHER'S DAILY ENTRIES
  // --------------------------------------------------

  useEffect(() => {
    async function loadEntries() {
      if (!user?.uid) {
        setEntries([]);
        setLoadingEntries(false);
        return;
      }

      try {
        setLoadingEntries(true);

        const entriesQuery = query(
          collection(db, "dailyEntries"),
          where("ownerId", "==", user.uid),
        );

        const querySnapshot = await getDocs(entriesQuery);

        const loadedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Newest date first
        loadedEntries.sort((a, b) => {
          const dateA = a.entryDate || "";
          const dateB = b.entryDate || "";

          return dateB.localeCompare(dateA);
        });

        setEntries(loadedEntries);
      } catch (error) {
        console.error("Error loading daily entries:", error);
      } finally {
        setLoadingEntries(false);
      }
    }

    loadEntries();
  }, [user]);

  // --------------------------------------------------
  // ADD SUBJECT
  // --------------------------------------------------

  async function addSubject(name) {
    if (!user?.uid) {
      alert("You must be signed in as a teacher.");
      return;
    }

    try {
      const cleanName = name.trim();

      const docRef = await addDoc(collection(db, "subjects"), {
        name: cleanName,
        ownerId: user.uid,
        createdAt: new Date(),
      });

      const newSubject = {
        id: docRef.id,
        name: cleanName,
        ownerId: user.uid,
      };

      setSubjects((currentSubjects) => [...currentSubjects, newSubject]);

      setShowAddSubject(false);
    } catch (error) {
      console.error("Error adding subject:", error);

      alert("Could not save the subject.");
    }
  }

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  function formatDate(dateString) {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // --------------------------------------------------
  // PHOTO MODAL
  // --------------------------------------------------

  function openPhoto(photo, title, entry) {
    setSelectedPhoto({
      url: photo,
      title: title,
      subject: entry.subjectName,
      date: formatDate(entry.entryDate),
      classwork: entry.classwork,
      homework: entry.homework,
    });
  }

  function closePhoto() {
    setSelectedPhoto(null);
  }

  function printPhoto() {
    window.print();
  }

  // --------------------------------------------------
  // LOGGED-OUT DASHBOARD
  // --------------------------------------------------

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-3xl font-bold text-slate-800">TaskCard</h1>

            <p className="mt-1 text-gray-500">
              Classroom communication made simple.
            </p>
          </div>
        </header>

        <main className="mx-auto flex max-w-4xl justify-center px-6 py-20">
          <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h2>

            <p className="mt-3 text-gray-500">
              Sign in to manage your subjects, classwork, and homework.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/login";
              }}
              className="mt-7 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-slate-700"
            >
              Teacher Login
            </button>

            <p className="mt-5 text-sm text-gray-400">
              Students should use the class link provided by their teacher.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // SUBJECT PAGE
  // --------------------------------------------------

  if (selectedSubject !== null) {
    return (
      <SubjectEntry
        subject={selectedSubject}
        user={user}
        onBack={() => {
          setSelectedSubject(null);
        }}
      />
    );
  }

  // --------------------------------------------------
  // TEACHER DASHBOARD
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100">
      {/* --------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------- */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddSubject(true)}
              className="rounded-lg bg-slate-800 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-slate-700"
            >
              + Add Subject
            </button>
          </div>
        </div>
      </header>

      {/* --------------------------------------------- */}
      {/* MAIN */}
      {/* --------------------------------------------- */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* ------------------------------------------- */}
        {/* ADD SUBJECT */}
        {/* ------------------------------------------- */}

        {showAddSubject && (
          <div className="mb-8">
            <AddSubject
              onAddSubject={addSubject}
              onCancel={() => setShowAddSubject(false)}
            />
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* SUBJECTS */}
        {/* ------------------------------------------- */}

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>

            <p className="mt-1 text-gray-500">
              Select a subject to add today's classwork and homework.
            </p>
          </div>

          {loadingSubjects ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-500">
              Loading subjects...
            </div>
          ) : subjects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No subjects yet
              </h3>

              <p className="mt-2 text-gray-500">
                Add your first subject to get started.
              </p>

              <button
                type="button"
                onClick={() => setShowAddSubject(true)}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
              >
                + Add Subject
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onOpen={() => setSelectedSubject(subject)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------------------- */}
        {/* DAILY ENTRIES */}
        {/* ------------------------------------------- */}

        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Daily Entries</h2>

            <p className="mt-1 text-gray-500">
              Classwork and homework from previous days.
            </p>
          </div>

          {loadingEntries ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-500">
              Loading daily entries...
            </div>
          ) : entries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No daily entries yet
              </h3>

              <p className="mt-2 text-gray-500">
                Your classwork and homework will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
                >
                  {/* ENTRY HEADER */}

                  <div className="border-b bg-gray-50 px-6 py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {entry.entryDate
                            ? new Date(
                                `${entry.entryDate}T00:00:00`,
                              ).toLocaleDateString("en-GB", {
                                month: "short",
                              })
                            : "---"}
                        </span>

                        <span className="text-3xl font-bold text-slate-800">
                          {entry.entryDate
                            ? new Date(`${entry.entryDate}T00:00:00`).getDate()
                            : "--"}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
                          {entry.subjectName}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {formatDate(entry.entryDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CLASSWORK / HOMEWORK */}

                  <div className="grid gap-6 p-6 lg:grid-cols-2">
                    {/* CLASSWORK */}

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                          📚
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900">CLASSWORK</h4>

                          <p className="text-xs text-gray-500">
                            What was learned today
                          </p>
                        </div>
                      </div>

                      <div className="whitespace-pre-wrap text-gray-700">
                        {entry.classwork || (
                          <span className="italic text-gray-400">
                            No classwork notes.
                          </span>
                        )}
                      </div>

                      {entry.classworkPhoto && (
                        <div className="mt-5 border-t pt-5">
                          <p className="mb-3 text-sm font-semibold text-gray-500">
                            Classwork Photo
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              openPhoto(
                                entry.classworkPhoto,
                                "Classwork Photo",
                                entry,
                              )
                            }
                            className="group block text-left"
                          >
                            <img
                              src={entry.classworkPhoto}
                              alt="Classwork"
                              className="h-32 w-32 rounded-lg border border-gray-200 object-cover shadow-sm transition group-hover:scale-105 group-hover:shadow-lg"
                            />

                            <p className="mt-2 text-sm font-medium text-blue-600">
                              Click to view large
                            </p>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* HOMEWORK */}

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-xl">
                          🏠
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900">HOMEWORK</h4>

                          <p className="text-xs text-gray-500">
                            Work to complete at home
                          </p>
                        </div>
                      </div>

                      <div className="whitespace-pre-wrap text-gray-700">
                        {entry.homework || (
                          <span className="italic text-gray-400">
                            No homework notes.
                          </span>
                        )}
                      </div>

                      {entry.homeworkPhoto && (
                        <div className="mt-5 border-t pt-5">
                          <p className="mb-3 text-sm font-semibold text-gray-500">
                            Homework Photo
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              openPhoto(
                                entry.homeworkPhoto,
                                "Homework Photo",
                                entry,
                              )
                            }
                            className="group block text-left"
                          >
                            <img
                              src={entry.homeworkPhoto}
                              alt="Homework"
                              className="h-32 w-32 rounded-lg border border-gray-200 object-cover shadow-sm transition group-hover:scale-105 group-hover:shadow-lg"
                            />

                            <p className="mt-2 text-sm font-medium text-blue-600">
                              Click to view large
                            </p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ================================================= */}
      {/* PHOTO PREVIEW MODAL */}
      {/* ================================================= */}

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[95vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedPhoto.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedPhoto.subject} • {selectedPhoto.date}
                </p>
              </div>

              <button
                type="button"
                onClick={closePhoto}
                className="rounded-lg px-3 py-2 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            <div className="printable-photo bg-white p-8">
              <div className="print-header mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">TaskCard</h1>

                <h2 className="mt-2 text-2xl font-bold text-gray-800">
                  {selectedPhoto.subject}
                </h2>

                <p className="mt-1 text-gray-500">{selectedPhoto.date}</p>

                <p className="mt-3 text-lg font-semibold text-gray-700">
                  {selectedPhoto.title}
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] max-w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={closePhoto}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={printPhoto}
                className="rounded-lg bg-slate-800 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-slate-700"
              >
                🖨️ Print Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
