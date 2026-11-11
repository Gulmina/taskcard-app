import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase";

function SubjectEntry({ subject, onBack, user }) {
  const { t } = useTranslation();

  const [classwork, setClasswork] = useState("");
  const [homework, setHomework] = useState("");

  const [classworkFile, setClassworkFile] = useState(null);
  const [homeworkFile, setHomeworkFile] = useState(null);

  const [classworkPhoto, setClassworkPhoto] = useState("");
  const [homeworkPhoto, setHomeworkPhoto] = useState("");

  const [entryId, setEntryId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // --------------------------------------------------
  // TODAY'S DATE
  // --------------------------------------------------

  function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // --------------------------------------------------
  // LOAD TODAY'S ENTRY
  // --------------------------------------------------

  useEffect(() => {
    async function loadTodayEntry() {
      try {
        setLoading(true);

        const querySnapshot = await getDocs(collection(db, "dailyEntries"));

        const today = getTodayDate();

        const existingEntry = querySnapshot.docs
          .map((entryDoc) => ({
            id: entryDoc.id,
            ...entryDoc.data(),
          }))
          .find(
            (entry) =>
              entry.subjectId === subject.id &&
              entry.entryDate === today &&
              entry.ownerId === user?.uid,
          );

        if (existingEntry) {
          setEntryId(existingEntry.id);

          setClasswork(existingEntry.classwork || "");
          setHomework(existingEntry.homework || "");

          setClassworkPhoto(existingEntry.classworkPhoto || "");
          setHomeworkPhoto(existingEntry.homeworkPhoto || "");
        }
      } catch (error) {
        console.error("Error loading today's entry:", error);
      } finally {
        setLoading(false);
      }
    }

    if (subject?.id && user?.uid) {
      loadTodayEntry();
    }
  }, [subject, user]);

  // --------------------------------------------------
  // UPLOAD PHOTO
  // --------------------------------------------------

  async function uploadPhoto(file, folder) {
    if (!file) {
      return null;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const storageRef = ref(storage, `${folder}/${subject.id}/${fileName}`);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  }

  // --------------------------------------------------
  // SAVE ENTRY
  // --------------------------------------------------

  async function handleSave(e) {
    e.preventDefault();

    if (!user?.uid) {
      alert(t("teacherSignInRequired"));
      return;
    }

    try {
      setSaving(true);

      let newClassworkPhoto = classworkPhoto;
      let newHomeworkPhoto = homeworkPhoto;

      if (classworkFile) {
        newClassworkPhoto = await uploadPhoto(classworkFile, "classwork");
      }

      if (homeworkFile) {
        newHomeworkPhoto = await uploadPhoto(homeworkFile, "homework");
      }

      const entryData = {
        subjectId: subject.id,
        subjectName: subject.name,

        classwork: classwork.trim(),
        homework: homework.trim(),

        classworkPhoto: newClassworkPhoto || null,
        homeworkPhoto: newHomeworkPhoto || null,

        entryDate: getTodayDate(),

        ownerId: user.uid,

        createdAt: new Date(),
      };

      // UPDATE EXISTING ENTRY
      if (entryId) {
        await updateDoc(doc(db, "dailyEntries", entryId), entryData);
      }

      // CREATE NEW ENTRY
      else {
        const newEntry = await addDoc(
          collection(db, "dailyEntries"),
          entryData,
        );

        setEntryId(newEntry.id);
      }

      setClassworkPhoto(newClassworkPhoto || "");
      setHomeworkPhoto(newHomeworkPhoto || "");

      setClassworkFile(null);
      setHomeworkFile(null);

      alert(t("entrySaved"));
    } catch (error) {
      console.error("Error saving entry:", error);

      alert(t("entrySaveError"));
    } finally {
      setSaving(false);
    }
  }

  // --------------------------------------------------
  // COPY STUDENT LINK
  // --------------------------------------------------

  async function copyStudentLink() {
    if (!entryId) {
      alert(t("saveBeforeCopying"));
      return;
    }

    const studentLink = `${window.location.origin}/student/${entryId}`;

    try {
      await navigator.clipboard.writeText(studentLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error("Could not copy student link:", error);

      window.prompt(t("copyStudentLinkPrompt"), studentLink);
    }
  }

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <p className="text-gray-500">{t("loadingTodayEntry")}</p>

          <LanguageSwitcher />
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-4 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← {t("backToSubjects")}
            </button>

            <h1 className="text-3xl font-bold text-slate-800">
              {subject.name}
            </h1>

            <p className="mt-1 text-gray-500">{t("todaysClassworkHomework")}</p>
          </div>

          <LanguageSwitcher />
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-4xl px-6 py-8">
        <form onSubmit={handleSave}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* CLASSWORK */}

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">
                {t("classwork")}
              </h2>

              <p className="mt-1 text-sm text-gray-500">{t("learnedToday")}</p>

              <textarea
                value={classwork}
                onChange={(e) => setClasswork(e.target.value)}
                placeholder={t("enterClasswork")}
                rows={8}
                className="mt-4 w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-slate-500"
              />

              <label className="mt-5 block text-sm font-medium text-gray-700">
                {t("classworkPhoto")}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setClassworkFile(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm text-gray-600"
              />

              {classworkPhoto && (
                <img
                  src={classworkPhoto}
                  alt={t("classworkPhoto")}
                  className="mt-4 h-32 w-32 rounded-lg border object-cover"
                />
              )}
            </section>

            {/* HOMEWORK */}

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">
                {t("homework")}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t("homeworkDescription")}
              </p>

              <textarea
                value={homework}
                onChange={(e) => setHomework(e.target.value)}
                placeholder={t("enterHomework")}
                rows={8}
                className="mt-4 w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-slate-500"
              />

              <label className="mt-5 block text-sm font-medium text-gray-700">
                {t("homeworkPhoto")}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHomeworkFile(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm text-gray-600"
              />

              {homeworkPhoto && (
                <img
                  src={homeworkPhoto}
                  alt={t("homeworkPhoto")}
                  className="mt-4 h-32 w-32 rounded-lg border object-cover"
                />
              )}
            </section>
          </div>

          {/* SAVE + STUDENT LINK */}

          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* SAVE */}

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-800 px-6 py-3 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
              >
                {saving
                  ? t("saving")
                  : entryId
                    ? t("updateTodayEntry")
                    : t("saveTodayEntry")}
              </button>

              {/* STUDENT LINK */}

              <button
                type="button"
                onClick={copyStudentLink}
                disabled={!entryId}
                className="rounded-lg border border-blue-300 bg-blue-50 px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copied ? t("studentLinkCopied") : `🔗 ${t("copyStudentLink")}`}
              </button>
            </div>

            {/* MESSAGE BEFORE SAVING */}

            {!entryId && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  {t("saveBeforeSharing")}
                </p>
              </div>
            )}

            {/* MESSAGE AFTER SAVING */}

            {entryId && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-800">
                  {t("studentLinkReady")}
                </p>

                <p className="mt-1 text-sm text-blue-700">
                  {t("studentLinkAccessInfo")}
                </p>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default SubjectEntry;
