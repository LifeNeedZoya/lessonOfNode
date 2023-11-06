import React from "react";
import { useState } from "react";
import Delete from "../Delete";

const TRow = ({ user }) => {
  const [userId, setUserId] = useState("");

  const getDepartment = (department) => {
    switch (department) {
      case "human resource": {
        return (
          <div className={`badge badge-primary badge-outline`}>
            {user.department}
          </div>
        );
      }
      case "technology": {
        return (
          <div className={`badge badge-secondary badge-outline`}>
            {user.department}
          </div>
        );
      }
      default: {
        return (
          <div className={`badge badge-accent badge-outline`}>
            {user.department}
          </div>
        );
      }
    }
  };

  const isSureToDelete = () => {
    setUserId(user.id);
  };

  return (
    <tr className="hover:bg-slate-700">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.avatarUrl} alt={user.firstName} />
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="font-bold">{user.firstName}</span>
      </td>
      <td>
        <span className="font-bold">{user.lastName}</span>
      </td>
      <td>
        <span className="font-bold">{user.email}</span>
      </td>
      <td>
        <button className="btn btn-ghost btn-xs">{user.birthDate}</button>
      </td>
      <td>{getDepartment(user.department)}</td>
      <td>
        <button className=" btn btn-warning  mx-2">засах</button>
        <button className="  btn btn-error  " onClick={isSureToDelete()}>
          устгах
        </button>
        <Delete userId={userId} />
      </td>
    </tr>
  );
};

export default TRow;
