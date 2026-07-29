import { Edit2, Save, XCircle, Plus, Trash2, Info } from "lucide-react";
import { useManageTestTypes } from "@/app/hooks/useManageTestTypes";

export default function ManageTestTypesModal({ canEdit }) {
  const {
    testTypes,
    loading,
    editingId,
    editForm,
    setEditForm,
    isAddingNew,
    setIsAddingNew,
    newTestType,
    setNewTestType,
    handleEdit,
    handleSave,
    handleCancel,
    handleToggleActive,
    handleAddNew,
    handleCancelNew,
  } = useManageTestTypes(canEdit);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 w-full flex flex-col">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {canEdit ? "Manage Test Types" : "View Test Types"}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Configure laboratory test type categories
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-white dark:bg-slate-800">
          {!canEdit && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">
                  View Only Mode
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  You don't have permission to edit test types. Contact an
                  administrator for changes.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {testTypes.map((testType) => (
              <div
                key={testType.testTypeId}
                className={`bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg border-2 ${
                  editingId === testType.testTypeId
                    ? "border-blue-500"
                    : "border-gray-300"
                } transition`}
              >
                {editingId === testType.testTypeId ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-gray-500 dark:text-slate-300">
                          ID: {testType.testTypeId}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-green-600 hover:text-white transition"
                        >
                          <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          <XCircle className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                          Test Type Name
                        </label>
                        <input
                          type="text"
                          value={editForm.typeName || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              typeName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-slate-500 rounded-lg focus:border-blue-500 outline-none bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                          Required Volume
                        </label>
                        <input
                          type="number"
                          value={editForm.requiredVolume || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              requiredVolume: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-slate-500 rounded-lg focus:border-blue-500 outline-none bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-slate-500 rounded-lg focus:border-blue-500 outline-none resize-none bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                      />
                    </div>

                    {/* Parameters Editor */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Parameters
                      </label>
                      <div className="space-y-2">
                        {(editForm.parameters || []).map((param) => (
                          <div
                            key={param.parameterId || param._tempId}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={param.parameterName || ""}
                              onChange={(e) => {
                                const newParams = editForm.parameters.map(
                                  (p) =>
                                    p.parameterId === param.parameterId &&
                                    p._tempId === param._tempId
                                      ? { ...p, parameterName: e.target.value }
                                      : p,
                                );
                                setEditForm({
                                  ...editForm,
                                  parameters: newParams,
                                });
                              }}
                              placeholder="Parameter Name"
                              className="flex-1 px-3 py-1.5 border-2 border-gray-300 dark:border-slate-500 rounded focus:border-blue-500 outline-none text-sm bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                            />
                            <input
                              type="text"
                              value={param.unit || ""}
                              onChange={(e) => {
                                const newParams = editForm.parameters.map(
                                  (p) =>
                                    p.parameterId === param.parameterId &&
                                    p._tempId === param._tempId
                                      ? { ...p, unit: e.target.value }
                                      : p,
                                );
                                setEditForm({
                                  ...editForm,
                                  parameters: newParams,
                                });
                              }}
                              placeholder="Unit"
                              className="w-28 px-3 py-1.5 border-2 border-gray-300 dark:border-slate-500 rounded focus:border-blue-500 outline-none text-sm bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                            />
                            <input
                              type="text"
                              value={param.limit || ""}
                              onChange={(e) => {
                                const newParams = editForm.parameters.map(
                                  (p) =>
                                    p.parameterId === param.parameterId &&
                                    p._tempId === param._tempId
                                      ? { ...p, limit: e.target.value }
                                      : p,
                                );
                                setEditForm({
                                  ...editForm,
                                  parameters: newParams,
                                });
                              }}
                              placeholder="Limit"
                              className="w-28 px-3 py-1.5 border-2 border-gray-300 dark:border-slate-500 rounded focus:border-blue-500 outline-none text-sm bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100"
                            />
                            <button
                              onClick={() => {
                                // Deletion maps exactly to standard filter
                                const newParams = editForm.parameters.filter(
                                  (p) =>
                                    !(
                                      p.parameterId === param.parameterId &&
                                      p._tempId === param._tempId
                                    ),
                                );
                                setEditForm({
                                  ...editForm,
                                  parameters: newParams,
                                });
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                              title="Delete Parameter"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newParam = {
                              _tempId: `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                              parameterName: "",
                              unit: "",
                              limit: "",
                            };
                            setEditForm({
                              ...editForm,
                              parameters: [
                                ...(editForm.parameters || []),
                                newParam,
                              ],
                            });
                          }}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 p-1.5 hover:bg-blue-50 rounded transition"
                        >
                          <Plus className="w-4 h-4" /> Add Parameter
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                              {testType.typeName}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                testType.isActive === 1
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700 dark:text-slate-200"
                              }`}
                            >
                              {testType.isActive === 1 ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                            {testType.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-slate-300">
                            <span>ID: {testType.testTypeId}</span>
                            <span>•</span>
                            <span>
                              Required Volume: {testType.requiredVolume || "—"}
                            </span>
                          </div>

                          <div className="mt-3">
                            {testType.parameters &&
                            testType.parameters.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {testType.parameters.map((param, i) => (
                                  <span
                                    key={param.parameterId || i}
                                    className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-100 text-xs font-medium border border-slate-300 dark:border-slate-500"
                                  >
                                    {param.parameterName}{" "}
                                    {param.unit ? `(${param.unit})` : ""}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 italic">
                                No parameters defined
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {canEdit && (
                          <>
                            <button
                              onClick={() =>
                                handleToggleActive(testType.testTypeId)
                              }
                              className={`px-4 py-2 rounded-lg font-medium transition bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 ${
                                testType.isActive === 1
                                  ? "hover:bg-yellow-100 hover:text-yellow-700"
                                  : "hover:bg-green-100 hover:text-green-700"
                              }`}
                            >
                              {testType.isActive === 1
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                            <button
                              onClick={() => handleEdit(testType)}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white transition"
                            >
                              <Edit2 className="w-4 h-4" /> Edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {canEdit && (
            <div className="mt-4">
              <button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                <Plus className="w-4 h-4" /> Add New Test Type
              </button>
            </div>
          )}

          {isAddingNew && (
            <div className="mt-4">
              <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg border-2 border-blue-500 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500 dark:text-slate-300">
                        ID: New
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-green-600 hover:text-white transition"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={handleCancelNew}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Test Type Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newTestType.typeName || ""}
                        onChange={(e) =>
                          setNewTestType({
                            ...newTestType,
                            typeName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                        Required Volume
                      </label>
                      <input
                        type="number"
                        value={newTestType.requiredVolume || ""}
                        onChange={(e) =>
                          setNewTestType({
                            ...newTestType,
                            requiredVolume: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTestType.description || ""}
                      onChange={(e) =>
                        setNewTestType({
                          ...newTestType,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none resize-none bg-white text-gray-900"
                    />
                  </div>

                  {/* Parameters for New Test Type */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                      Parameters
                    </label>
                    <div className="space-y-2">
                      {(newTestType.parameters || []).map((param) => (
                        <div
                          key={param._tempId}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={param.parameterName}
                            onChange={(e) => {
                              const newParams = newTestType.parameters.map(
                                (p) =>
                                  p._tempId === param._tempId
                                    ? { ...p, parameterName: e.target.value }
                                    : p,
                              );
                              setNewTestType({
                                ...newTestType,
                                parameters: newParams,
                              });
                            }}
                            placeholder="Parameter Name"
                            className="flex-1 px-3 py-1.5 border-2 border-gray-300 rounded outline-none text-sm bg-white text-gray-900"
                          />
                          <input
                            type="text"
                            value={param.unit}
                            onChange={(e) => {
                              const newParams = newTestType.parameters.map(
                                (p) =>
                                  p._tempId === param._tempId
                                    ? { ...p, unit: e.target.value }
                                    : p,
                              );
                              setNewTestType({
                                ...newTestType,
                                parameters: newParams,
                              });
                            }}
                            placeholder="Unit"
                            className="w-28 px-3 py-1.5 border-2 border-gray-300 rounded outline-none text-sm bg-white text-gray-900"
                          />
                          <input
                            type="text"
                            value={param.limit || ""}
                            onChange={(e) => {
                              const newParams = newTestType.parameters.map(
                                (p) =>
                                  p._tempId === param._tempId
                                    ? { ...p, limit: e.target.value }
                                    : p,
                              );
                              setNewTestType({
                                ...newTestType,
                                parameters: newParams,
                              });
                            }}
                            placeholder="Limit"
                            className="w-28 px-3 py-1.5 border-2 border-gray-300 rounded outline-none text-sm bg-white text-gray-900"
                          />
                          <button
                            onClick={() => {
                              const newParams = newTestType.parameters.filter(
                                (p) => p._tempId !== param._tempId,
                              );
                              setNewTestType({
                                ...newTestType,
                                parameters: newParams,
                              });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newParam = {
                            _tempId: `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                            parameterName: "",
                            unit: "",
                            limit: "",
                          };
                          setNewTestType({
                            ...newTestType,
                            parameters: [
                              ...(newTestType.parameters || []),
                              newParam,
                            ],
                          });
                        }}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 p-1.5 hover:bg-blue-50 rounded"
                      >
                        <Plus className="w-4 h-4" /> Add Parameter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
