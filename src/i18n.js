import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to TaskCard",
      login: "Sign in",
      signup: "Create an account",
      logout: "Sign out",
      dashboard: "Teacher Dashboard",
      addSubject: "Add Subject",
      homework: "Homework",
      classwork: "Classwork",
      language: "Language",
      teacherSignInRequired: "You must be signed in as a teacher.",
      saveSubjectError: "Could not save the subject.",
      teacherSignInRequired: "Du musst als Lehrkraft angemeldet sein.",
      saveSubjectError: "Das Fach konnte nicht gespeichert werden.",
      backToSubjects: "Back to subjects",
      todaysClassworkHomework: "Today's classwork and homework",
      classwork: "Classwork",
      homework: "Homework",
      learnedToday: "What was learned today",
      homeworkDescription: "Work to complete at home",
      classworkPhoto: "Classwork photo",
      homeworkPhoto: "Homework photo",
      enterClasswork: "Enter today's classwork...",
      enterHomework: "Enter today's homework...",
      loadingTodayEntry: "Loading today's entry...",
      saving: "Saving...",
      saveTodayEntry: "Save Today's Entry",
      updateTodayEntry: "Update Today's Entry",
      entrySaved: "Today's entry was saved.",
      entrySaveError: "Could not save the entry.",
      saveBeforeCopying: "Please save today's entry first.",
      copyStudentLinkPrompt: "Copy this student link:",
      studentLinkCopied: "✓ Student Link Copied",
      copyStudentLink: "Copy Student Link",
      saveBeforeSharing:
        "Save today's entry first. After saving, you can copy the student link and share it with your students.",
      studentLinkReady: "Your student link is ready.",
      studentLinkAccessInfo:
        "Anyone who has this link can view this class entry without signing in.",
      teacherSignInRequired: "You must be signed in as a teacher.",
    },
  },

  de: {
    translation: {
      welcome: "Willkommen bei TaskCard",
      login: "Anmelden",
      signup: "Konto erstellen",
      logout: "Abmelden",
      dashboard: "Lehrer-Dashboard",
      addSubject: "Fach hinzufügen",
      homework: "Hausaufgaben",
      classwork: "Unterrichtsinhalte",
      language: "Sprache",
      backToSubjects: "Zurück zu den Fächern",
      todaysClassworkHomework: "Heutige Unterrichtsinhalte und Hausaufgaben",
      classwork: "Unterrichtsinhalte",
      homework: "Hausaufgaben",
      learnedToday: "Das haben wir heute gelernt",
      homeworkDescription: "Aufgaben für zu Hause",
      classworkPhoto: "Foto zum Unterricht",
      homeworkPhoto: "Hausaufgabenfoto",
      enterClasswork: "Heutige Unterrichtsinhalte eingeben...",
      enterHomework: "Heutige Hausaufgaben eingeben...",
      loadingTodayEntry: "Der heutige Eintrag wird geladen...",
      saving: "Wird gespeichert...",
      saveTodayEntry: "Heutigen Eintrag speichern",
      updateTodayEntry: "Heutigen Eintrag aktualisieren",
      entrySaved: "Der heutige Eintrag wurde gespeichert.",
      entrySaveError: "Der Eintrag konnte nicht gespeichert werden.",
      saveBeforeCopying: "Bitte speichere zuerst den heutigen Eintrag.",
      copyStudentLinkPrompt: "Diesen Schülerlink kopieren:",
      studentLinkCopied: "✓ Schülerlink kopiert",
      copyStudentLink: "Schülerlink kopieren",
      saveBeforeSharing:
        "Speichere zuerst den heutigen Eintrag. Danach kannst du den Schülerlink kopieren und mit deiner Klasse teilen.",
      studentLinkReady: "Dein Schülerlink ist bereit.",
      studentLinkAccessInfo:
        "Alle Personen mit diesem Link können diesen Klasseneintrag ohne Anmeldung ansehen.",
      teacherSignInRequired: "Du musst als Lehrkraft angemeldet sein.",
    },
  },
};

const savedLanguage = localStorage.getItem("taskcard-language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
