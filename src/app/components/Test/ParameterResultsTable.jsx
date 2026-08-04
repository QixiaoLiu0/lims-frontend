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
      <div className="px-6 py-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 m-4">
        <h4 className="text-base font-semibold leading-tight text-slate-900 dark:text-slate-100 mb-2">
          No Parameters Configured
        </h4>
        <p className="text-sm font-medium leading-normal text-slate-500 dark:text-slate-400">
          This test currently has no parameter definitions returned from the
          API.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
              Parameter
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight w-1/3">
              Result
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
              Unit
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
              Limit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {results.map(item => {
            const currentValue =
              editedValues[item.resultId] !== undefined
                ? editedValues[item.resultId]
                : item.value || "";

            return (
              <tr
                key={item.resultId}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
                    {item.parameterName}
                  </p>
                </td>

                <td
                  className={`px-6 py-4 ${
                    canEdit
                      ? "cursor-pointer hover:bg-white dark:hover:bg-slate-600 transition-colors"
                      : ""
                  }`}
                  onClick={() => {
                    if (canEdit) setEditingCellId(item.resultId);
                  }}
                  title={canEdit ? "Click to edit" : ""}
                >
                  {/* if the the cell is editing */}
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
                      className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full max-w-[200px] font-mono text-sm shadow-sm transition-colors"
                      placeholder="Input result"
                    />
                  ) : (
                    <div className="min-h-[28px] flex items-center">
                      <p className="font-mono text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
                        {currentValue || "--"}
                      </p>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">
                    {item.unit}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">
                    {item.limit}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
