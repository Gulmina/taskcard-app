import { useState } from "react";

function MemberList({ members }) {
  return (
    <div>
      <h2>Members</h2>

      {members.map((member) => (
        <div key={member.id}>
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </div>
      ))}
    </div>
  );
}

export default MemberList;
