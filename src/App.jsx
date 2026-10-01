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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const path = window.location.pathname;

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  if (path === "/login") {
    return <Login />;
  }

  // --------------------------------------------------
  // SIGNUP
  // --------------------------------------------------

  if (path === "/signup") {
    return <Signup />;
  }

  // --------------------------------------------------
  // PUBLIC STUDENT CLASS PAGE
  // --------------------------------------------------

  const studentClassMatch = path.match(/^\/student\/class\/([^/]+)$/);

  if (studentClassMatch) {
    const subjectId = studentClassMatch[1];

    return <StudentEntry subjectId={subjectId} />;
  }

  // --------------------------------------------------
  // OLD PUBLIC STUDENT ENTRY LINK
  // --------------------------------------------------

  const studentEntryMatch = path.match(/^\/student\/([^/]+)$/);

  if (studentEntryMatch) {
    const entryId = studentEntryMatch[1];

    return <StudentEntry entryId={entryId} />;
  }

  // --------------------------------------------------
  // WAIT FOR AUTH
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading TaskCard...</p>
      </div>
    );
  }

  // --------------------------------------------------
  // TEACHER DASHBOARD
  // --------------------------------------------------

  return (
    <div>
      {user && (
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
      )}

      <Dashboard user={user} />
    </div>
  );
}

export default App;
