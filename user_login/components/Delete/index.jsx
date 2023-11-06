import React from "react";

const Delete = () => {
  const deleteData = async ({ userId }) => {
    try {
      const { message } = await fetch(
        `http://localhost:8000/api/users/:${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.splice(message),
        }
      );
    } catch (error) {
      console.log("ERR", error);
    } finally {
    }
  };

  return <div></div>;
};

export default Delete;
