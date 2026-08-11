import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-900";
    case "In-Progress":
      return "bg-blue-100 text-blue-900";
    default:
      return "bg-blue-100 text-blue-900";
  }
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-sm font-medium ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
