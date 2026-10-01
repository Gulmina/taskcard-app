import { useState } from "react";

function MemberForm({ onAddMember }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: name,
      email: email,
    };

    onAddMember(newMember);

    // Clear the form
    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Member</h2>

      <input
        type="text"
        placeholder="Member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />

      <input
        type="email"
        placeholder="Member email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Add Member
      </button>
    </form>
  );
}

export default MemberForm;
