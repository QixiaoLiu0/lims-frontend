import React, { useState } from "react";

export default function ParameterResultsTable({
  results,
  editedValues,
  handleValueChange,
  canEdit,
}) {
  // 🚀 核心状态：记录当前正在编辑的 resultId current editing result value
  const [editingCellId, setEditingCellId] = useState(null);

  if (!results || results.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          No Parameters Configured
        </h4>
        <p className="text-slate-700 dark:text-slate-200 text-base">
          This test currently has no parameter definitions returned from the
          API.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="border-b border-slate-400 dark:border-slate-600 bg-slate-200 dark:bg-slate-700">
        <tr>
          <th className="px-6 py-4 text-left text-base font-semibold text-slate-900 dark:text-slate-100">
            Parameter
          </th>
          <th className="px-6 py-4 text-left text-base font-semibold text-slate-900 dark:text-slate-100 w-1/3">
            Result
          </th>
          <th className="px-6 py-4 text-left text-base font-semibold text-slate-900 dark:text-slate-100">
            Unit
          </th>
          <th className="px-6 py-4 text-left text-base font-semibold text-slate-900 dark:text-slate-100">
            Limit
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-400 dark:divide-slate-600">
        {results.map(item => {
          const currentValue =
            editedValues[item.resultId] !== undefined
              ? editedValues[item.resultId]
              : item.value || "";

          return (
            <tr
              key={item.resultId}
              className="hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {item.parameterName}
                </p>
              </td>

              <td
                className={`px-6 py-4 ${canEdit ? "cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-600/50 transition" : ""}`}
                onClick={() => {
                  if (canEdit) setEditingCellId(item.resultId);
                }}
                title={canEdit ? "Click to edit" : ""}
              >
                {/* if the the cell is editing*/}
                {editingCellId === item.resultId ? (
                  <input
                    autoFocus
                    type="text"
                    value={currentValue}
                    onChange={e =>
                      handleValueChange(item.resultId, e.target.value)
                    }
                    onBlur={() => setEditingCellId(null)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === "Escape") {
                        setEditingCellId(null); //quit editing
                      }
                    }}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full max-w-[200px] font-mono text-base shadow-sm"
                    placeholder="Input result"
                  />
                ) : (
                  <p className="font-mono text-slate-900 dark:text-slate-100 font-semibold min-h-[24px]">
                    {currentValue || "--"}
                  </p>
                )}
              </td>

              <td className="px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {item.unit}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-700 dark:text-slate-300">
                  {item.limit}
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
