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
      teacherTaskCard: "Teacher TaskCard",
      signInPrompt: "Sign in to your account",
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
      login: "Sign in",
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
      teacherTaskCard: "TaskCard für Lehrkräfte",
      signInPrompt: "Melde dich bei deinem Konto an",
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
      login: "Anmelden",
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
