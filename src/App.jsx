import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

import Dashboard from "./components/Dashboard";
import StudentEntry from "./components/StudentEntry";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (window.location.pathname === "/signup") {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        // Refresh the user's latest Firebase account information
        await currentUser.reload();

        // Only verified email accounts can remain signed in
        if (!currentUser.emailVerified) {
          await signOut(auth);

          if (active) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        // Refresh the token so Firebase security rules
        // receive the latest email_verified status
        await currentUser.getIdToken(true);

        if (active) {
          setUser(auth.currentUser);
          setLoading(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        await signOut(auth).catch(console.error);

        if (active) {
          setUser(null);
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const path = window.location.pathname;

  // LOGIN
  if (path === "/login") {
    return <Login />;
  }

  // SIGNUP
  if (path === "/signup") {
    return <Signup />;
  }

  // PUBLIC STUDENT CLASS PAGE
  if (path.startsWith("/student/class/")) {
    const studentClassMatch = path.match(/^\/student\/class\/([^/]+)$/);

    if (studentClassMatch) {
      const subjectId = studentClassMatch[1];
      return <StudentEntry subjectId={subjectId} />;
    }
  }

  // OLD PUBLIC STUDENT ENTRY LINK
  const studentEntryMatch = path.match(/^\/student\/([^/]+)$/);

  if (studentEntryMatch) {
    const entryId = studentEntryMatch[1];
    return <StudentEntry entryId={entryId} />;
  }

  // WAIT FOR AUTHENTICATION CHECK
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading TaskCard...</p>
      </div>
    );
  }

  // BLOCK USERS WHO ARE NOT SIGNED IN
  if (!user || !user.emailVerified) {
    return <Login />;
  }

  // VERIFIED TEACHER DASHBOARD
  return (
    <div>
      <div className="border-b bg-white px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-slate-500">{user.email}</p>

          <button
            type="button"
            onClick={() => signOut(auth)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      </div>

      <Dashboard user={user} />
    </div>
  );
}

export default App;
