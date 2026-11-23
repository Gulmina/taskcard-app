import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // GENERAL
      welcome: "Welcome to TaskCard",
      login: "Sign in",
      signup: "Create an account",
      logout: "Sign out",
      dashboard: "Teacher Dashboard",
      addSubject: "Add Subject",
      homework: "Homework",
      classwork: "Classwork",
      language: "Language",

      // ADD SUBJECT
      subjectName: "Subject name",
      subjectPlaceholder: "e.g. Mathematics",
      createSubject: "Create Subject",
      cancel: "Cancel",

      // DASHBOARD
      tagline: "Classroom communication made simple.",
      teacherDashboard: "Teacher Dashboard",
      teacherLogin: "Teacher Login",
      signInPrompt: "Sign in to manage your subjects, classwork, and homework.",
      studentLinkInfo:
        "Students should use the class link provided by their teacher.",

      mySubjects: "My Subjects",
      selectSubject: "Select a subject to add today's classwork and homework.",
      loadingSubjects: "Loading subjects...",
      noSubjects: "No subjects yet",
      addFirstSubject: "Add your first subject to get started.",

      dailyEntries: "Daily Entries",
      previousEntries: "Classwork and homework from previous days.",
      loadingEntries: "Loading daily entries...",
      noEntries: "No daily entries yet",
      entriesAppear: "Your classwork and homework will appear here.",

      classworkLabel: "CLASSWORK",
      learnedToday: "What was learned today",
      noClasswork: "No classwork notes.",
      classworkPhoto: "Classwork Photo",

      homeworkLabel: "HOMEWORK",
      homeworkDescription: "Work to complete at home",
      noHomework: "No homework notes.",
      homeworkPhoto: "Homework Photo",

      viewLarge: "Click to view large",
      unknownDate: "Unknown date",
      close: "Close",
      printPhoto: "Print Photo",

      // SUBJECT ENTRY
      backToSubjects: "Back to subjects",
      todaysClassworkHomework: "Today's classwork and homework",
      enterClasswork: "Enter today's classwork...",
      enterHomework: "Enter today's homework...",
      loadingTodayEntry: "Loading today's entry...",
      saving: "Saving...",
      saveTodayEntry: "Save Today's Entry",
      updateTodayEntry: "Update Today's Entry",
      entrySaved: "Today's entry was saved.",
      entrySaveError: "Could not save the entry.",

      // STUDENT LINK
      saveBeforeCopying: "Please save today's entry first.",
      copyStudentLinkPrompt: "Copy this student link:",
      studentLinkCopied: "✓ Student Link Copied",
      copyStudentLink: "Copy Student Link",
      saveBeforeSharing:
        "Save today's entry first. After saving, you can copy the student link and share it with your students.",
      studentLinkReady: "Your student link is ready.",
      studentLinkAccessInfo:
        "Anyone who has this link can view this class entry without signing in.",

      // AUTHENTICATION
      teacherSignInRequired: "You must be signed in as a teacher.",
      saveSubjectError: "Could not save the subject.",

      teacherTaskCard: "Teacher TaskCard",
      email: "Email",
      password: "Password",
      signingIn: "Signing in...",
      incorrectCredentials: "Incorrect email or password.",
      invalidEmail: "Please enter a valid email address.",
      tooManyRequests: "Too many attempts. Please wait and try again.",
      emailVerificationUnavailable:
        "Email verification is currently unavailable.",
      generalError: "Something went wrong. Please try again.",
      emailNotVerified:
        "Your email is not verified. Please check your inbox or resend the verification email.",
      enterEmailAndPassword:
        "Please enter your email address and password first.",
      alreadyVerified: "Your email is already verified. You can sign in now.",
      verificationEmailSent:
        "A new verification email has been sent. Please check your inbox and spam folder.",
      enterEmailFirst: "Enter your email address first.",
      passwordResetSent: "Password reset email sent. Check your inbox.",
      forgotPassword: "Forgot password?",
      resendVerification: "Resend verification email",
      sendingVerification: "Sending verification email...",
      newTeacher: "New teacher? Create an account",

      // SIGNUP
      createTeacherAccount: "Create a teacher account",
      confirmPassword: "Confirm password",
      createAccount: "Create Account",
      creatingAccount: "Creating account...",
      alreadyHaveAccount: "Already have an account? Sign in",
      passwordsDoNotMatch: "Passwords do not match.",
      passwordTooShort: "Password must be at least 6 characters.",
      emailAlreadyExists: "An account with this email already exists.",
      weakPassword: "Please choose a stronger password.",
      signupError:
        "Could not create the account or send verification email. Please try again.",
      accountCreatedVerification:
        "Account created! Please check your email and click the verification link before signing in. Also check your spam folder.",
    },
  },

  de: {
    translation: {
      // GENERAL
      welcome: "Willkommen bei TaskCard",
      login: "Anmelden",
      signup: "Konto erstellen",
      logout: "Abmelden",
      dashboard: "Lehrer-Dashboard",
      addSubject: "Fach hinzufügen",
      homework: "Hausaufgaben",
      classwork: "Unterrichtsinhalte",
      language: "Sprache",

      // ADD SUBJECT
      subjectName: "Fachname",
      subjectPlaceholder: "z. B. Mathematik",
      createSubject: "Fach erstellen",
      cancel: "Abbrechen",

      // DASHBOARD
      tagline: "Einfache Kommunikation zwischen Schule und Zuhause.",
      teacherDashboard: "Lehrer-Dashboard",
      teacherLogin: "Lehrkraft-Anmeldung",
      signInPrompt:
        "Melde dich an, um deine Fächer, Unterrichtsinhalte und Hausaufgaben zu verwalten.",
      studentLinkInfo:
        "Schülerinnen und Schüler nutzen bitte den Klassenlink ihrer Lehrkraft.",

      mySubjects: "Meine Fächer",
      selectSubject:
        "Wähle ein Fach, um die heutigen Unterrichtsinhalte und Hausaufgaben hinzuzufügen.",
      loadingSubjects: "Fächer werden geladen...",
      noSubjects: "Noch keine Fächer vorhanden",
      addFirstSubject: "Füge dein erstes Fach hinzu.",

      dailyEntries: "Tägliche Einträge",
      previousEntries:
        "Unterrichtsinhalte und Hausaufgaben aus vergangenen Tagen.",
      loadingEntries: "Einträge werden geladen...",
      noEntries: "Noch keine Einträge vorhanden",
      entriesAppear:
        "Deine Unterrichtsinhalte und Hausaufgaben erscheinen hier.",

      classworkLabel: "UNTERRICHTSINHALTE",
      learnedToday: "Das haben wir heute gelernt",
      noClasswork: "Keine Unterrichtsinhalte vorhanden.",
      classworkPhoto: "Foto zum Unterricht",

      homeworkLabel: "HAUSAUFGABEN",
      homeworkDescription: "Aufgaben für zu Hause",
      noHomework: "Keine Hausaufgaben vorhanden.",
      homeworkPhoto: "Hausaufgabenfoto",

      viewLarge: "Zum Vergrößern anklicken",
      unknownDate: "Unbekanntes Datum",
      close: "Schließen",
      printPhoto: "Foto drucken",

      // SUBJECT ENTRY
      backToSubjects: "Zurück zu den Fächern",
      todaysClassworkHomework: "Heutige Unterrichtsinhalte und Hausaufgaben",
      enterClasswork: "Heutige Unterrichtsinhalte eingeben...",
      enterHomework: "Heutige Hausaufgaben eingeben...",
      loadingTodayEntry: "Der heutige Eintrag wird geladen...",
      saving: "Wird gespeichert...",
      saveTodayEntry: "Heutigen Eintrag speichern",
      updateTodayEntry: "Heutigen Eintrag aktualisieren",
      entrySaved: "Der heutige Eintrag wurde gespeichert.",
      entrySaveError: "Der Eintrag konnte nicht gespeichert werden.",

      // STUDENT LINK
      saveBeforeCopying: "Bitte speichere zuerst den heutigen Eintrag.",
      copyStudentLinkPrompt: "Diesen Schülerlink kopieren:",
      studentLinkCopied: "✓ Schülerlink kopiert",
      copyStudentLink: "Schülerlink kopieren",
      saveBeforeSharing:
        "Speichere zuerst den heutigen Eintrag. Danach kannst du den Schülerlink kopieren und mit deiner Klasse teilen.",
      studentLinkReady: "Dein Schülerlink ist bereit.",
      studentLinkAccessInfo:
        "Alle Personen mit diesem Link können diesen Klasseneintrag ohne Anmeldung ansehen.",

      // AUTHENTICATION
      teacherSignInRequired: "Du musst als Lehrkraft angemeldet sein.",
      saveSubjectError: "Das Fach konnte nicht gespeichert werden.",

      teacherTaskCard: "TaskCard für Lehrkräfte",
      email: "E-Mail",
      password: "Passwort",
      signingIn: "Anmeldung läuft...",
      incorrectCredentials: "E-Mail oder Passwort ist falsch.",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      tooManyRequests: "Zu viele Versuche. Bitte warte einen Moment.",
      emailVerificationUnavailable:
        "Die E-Mail-Verifizierung ist derzeit nicht verfügbar.",
      generalError: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      emailNotVerified:
        "Deine E-Mail-Adresse wurde noch nicht bestätigt. Bitte prüfe deinen Posteingang oder fordere eine neue Bestätigungs-E-Mail an.",
      enterEmailAndPassword:
        "Bitte gib zuerst deine E-Mail-Adresse und dein Passwort ein.",
      alreadyVerified:
        "Deine E-Mail-Adresse ist bereits bestätigt. Du kannst dich anmelden.",
      verificationEmailSent:
        "Eine neue Bestätigungs-E-Mail wurde gesendet. Bitte prüfe deinen Posteingang und Spam-Ordner.",
      enterEmailFirst: "Bitte gib zuerst deine E-Mail-Adresse ein.",
      passwordResetSent:
        "Die E-Mail zum Zurücksetzen des Passworts wurde gesendet.",
      forgotPassword: "Passwort vergessen?",
      resendVerification: "Bestätigungs-E-Mail erneut senden",
      sendingVerification: "Bestätigungs-E-Mail wird gesendet...",
      newTeacher: "Neue Lehrkraft? Konto erstellen",

      // SIGNUP
      createTeacherAccount: "Lehrkraftkonto erstellen",
      confirmPassword: "Passwort bestätigen",
      createAccount: "Konto erstellen",
      creatingAccount: "Konto wird erstellt...",
      alreadyHaveAccount: "Du hast bereits ein Konto? Anmelden",
      passwordsDoNotMatch: "Die Passwörter stimmen nicht überein.",
      passwordTooShort: "Das Passwort muss mindestens 6 Zeichen lang sein.",
      emailAlreadyExists:
        "Für diese E-Mail-Adresse existiert bereits ein Konto.",
      weakPassword: "Bitte wähle ein stärkeres Passwort.",
      signupError:
        "Das Konto oder die Bestätigungs-E-Mail konnte nicht erstellt bzw. gesendet werden. Bitte versuche es erneut.",
      accountCreatedVerification:
        "Konto erstellt! Bitte prüfe deine E-Mails und klicke auf den Bestätigungslink, bevor du dich anmeldest. Prüfe auch deinen Spam-Ordner.",
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
