import React from "react";
// firebase hooks
import useFirebaseDb from "src/hooks/useFirebaseDb";

export default function ManageStats() {
  const { createNewUser } = useFirebaseDb();

  const handleClick = () => {
    createNewUser("john doe");
  };

  return (
    <div>
      <button
        style={{ backgroundColor: "white", border: "1px solid black" }}
        onClick={handleClick}
      >
        Create New User
      </button>
    </div>
  );
}
