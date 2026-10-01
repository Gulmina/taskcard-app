function SubjectCard({ subject, onOpen }) {
  async function copyStudentLink() {
    const studentLink = `${window.location.origin}/student/class/${subject.id}`;

    try {
      await navigator.clipboard.writeText(studentLink);

      alert("Student link copied!");
    } catch (error) {
      console.error("Could not copy student link:", error);

      window.prompt("Copy this student link:", studentLink);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900">{subject.name}</h4>

      <p className="mt-2 text-sm text-gray-500">
        Today's classwork and homework
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          Today's entry →
        </button>

        <button
          type="button"
          onClick={copyStudentLink}
          className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 font-medium text-blue-700 transition hover:bg-blue-100"
        >
          🔗 Copy Student Link
        </button>
      </div>
    </div>
  );
}

export default SubjectCard;
