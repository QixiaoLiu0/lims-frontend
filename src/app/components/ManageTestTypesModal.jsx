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
      <div className="p-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full flex flex-col shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {canEdit ? "Manage Test Types" : "View Test Types"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium leading-tight">
              Configure laboratory test type categories
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-800">
          {!canEdit && (
            <div className="mb-6 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 dark:text-blue-300 font-semibold leading-tight mb-1">
                  View Only Mode
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-normal">
                  You don't have permission to edit test types. Contact an
                  administrator for changes.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5">
            {testTypes.map(testType => (
              <div
                key={testType.testTypeId}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 transition-all ${
                  editingId === testType.testTypeId
                    ? "border border-blue-500 ring-1 ring-blue-500 shadow-md"
                    : "border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
                }`}
              >
                {editingId === testType.testTypeId ? (
                  // Edit Mode
                  <div className="space-y-5">
                    <div className="flex items-center justify-between mb-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                          ID: {testType.testTypeId}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium leading-tight shadow-sm"
                        >
                          <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium leading-tight"
                        >
                          <XCircle className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                          Test Type Name
                        </label>
                        <input
                          type="text"
                          value={editForm.typeName || ""}
                          onChange={e =>
                            setEditForm({
                              ...editForm,
                              typeName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                          Required Volume
                        </label>
                        <input
                          type="number"
                          value={editForm.requiredVolume || ""}
                          onChange={e =>
                            setEditForm({
                              ...editForm,
                              requiredVolume: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                        Description
                      </label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={e =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                      />
                    </div>

                    {/* Parameters Editor */}
                    <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 leading-tight">
                        Parameters
                      </label>
                      <div className="space-y-3">
                        {(editForm.parameters || []).map(param => (
                          <div
                            key={param.parameterId || param._tempId}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="text"
                              value={param.parameterName || ""}
                              onChange={e => {
                                const newParams = editForm.parameters.map(p =>
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
                              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                            />
                            <input
                              type="text"
                              value={param.unit || ""}
                              onChange={e => {
                                const newParams = editForm.parameters.map(p =>
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
                              className="w-28 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                            />
                            <input
                              type="text"
                              value={param.limit || ""}
                              onChange={e => {
                                const newParams = editForm.parameters.map(p =>
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
                              className="w-28 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                            />
                            <button
                              onClick={() => {
                                // Deletion maps exactly to standard filter
                                const newParams = editForm.parameters.filter(
                                  p =>
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
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
                          className="items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mt-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors inline-flex"
                        >
                          <Plus className="w-4 h-4" /> Add Parameter
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                              {testType.typeName}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight ${
                                testType.isActive === 1
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                  : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {testType.isActive === 1 ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-normal mb-3">
                            {testType.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                              ID: {testType.testTypeId}
                            </span>
                            <span>•</span>
                            <span>
                              Required Volume: {testType.requiredVolume || "—"}
                            </span>
                          </div>

                          <div>
                            {testType.parameters &&
                            testType.parameters.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {testType.parameters.map((param, i) => (
                                  <span
                                    key={param.parameterId || i}
                                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 leading-tight"
                                  >
                                    {param.parameterName}{" "}
                                    {param.unit ? `(${param.unit})` : ""}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">
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
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                                testType.isActive === 1
                                  ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-yellow-600 dark:hover:text-yellow-500"
                                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-500"
                              }`}
                            >
                              {testType.isActive === 1
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                            <button
                              onClick={() => handleEdit(testType)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors text-sm font-medium"
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
            <div className="mt-6">
              <button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors text-sm font-semibold shadow-sm border border-slate-200 dark:border-transparent leading-tight"
              >
                <Plus className="w-4 h-4" /> Add New Test Type
              </button>
            </div>
          )}

          {isAddingNew && (
            <div className="mt-5">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-blue-500 ring-1 ring-blue-500 transition-all">
                <div className="space-y-5">
                  <div className="flex items-center justify-between mb-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        ID: New
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddNew}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium leading-tight shadow-sm"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={handleCancelNew}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium leading-tight"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                        Test Type Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newTestType.typeName || ""}
                        onChange={e =>
                          setNewTestType({
                            ...newTestType,
                            typeName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                        Required Volume
                      </label>
                      <input
                        type="number"
                        value={newTestType.requiredVolume || ""}
                        onChange={e =>
                          setNewTestType({
                            ...newTestType,
                            requiredVolume: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                      Description
                    </label>
                    <textarea
                      value={newTestType.description || ""}
                      onChange={e =>
                        setNewTestType({
                          ...newTestType,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-900 dark:text-slate-100 text-sm transition-colors"
                    />
                  </div>

                  {/* Parameters for New Test Type */}
                  <div className="pt-5 border-t border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 leading-tight">
                      Parameters
                    </label>
                    <div className="space-y-3">
                      {(newTestType.parameters || []).map(param => (
                        <div
                          key={param._tempId}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="text"
                            value={param.parameterName}
                            onChange={e => {
                              const newParams = newTestType.parameters.map(p =>
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
                            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                          />
                          <input
                            type="text"
                            value={param.unit}
                            onChange={e => {
                              const newParams = newTestType.parameters.map(p =>
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
                            className="w-28 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                          />
                          <input
                            type="text"
                            value={param.limit || ""}
                            onChange={e => {
                              const newParams = newTestType.parameters.map(p =>
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
                            className="w-28 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                          />
                          <button
                            onClick={() => {
                              const newParams = newTestType.parameters.filter(
                                p => p._tempId !== param._tempId,
                              );
                              setNewTestType({
                                ...newTestType,
                                parameters: newParams,
                              });
                            }}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
                        className="items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mt-3 p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors inline-flex"
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
