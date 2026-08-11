import { useState, useCallback, useEffect } from "react";
import { testTypeService } from "@/services/testTypeService";

export function useManageTestTypes(canEdit) {
  // core state
  const [testTypes, setTestTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // `new` state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTestType, setNewTestType] = useState(getInitialNewState());

  function getInitialNewState() {
    return {
      typeName: "",
      description: "",
      requiredVolume: "",
      bgColor: "Purple",
      iconColor: "Purple",
      borderColor: "Purple",
      isActive: 1,
      parameters: [],
    };
  }

  // get test types from api
  const fetchTestTypes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await testTypeService.getList();
      const realData = res?.data || res || [];
      setTestTypes(Array.isArray(realData) ? realData : []);
    } catch (error) {
      console.error("Failed to fetch test types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestTypes();
  }, [fetchTestTypes]);

  // creation deletion update api---Update Test Type
  const buildPayload = formState => {
    return {
      typeName: formState.typeName,
      requiredVolume: parseFloat(formState.requiredVolume) || 0,
      description: formState.description || "",
      bgColor: formState.bgColor || "Blue",
      iconColor: formState.iconColor || "Blue",
      borderColor: formState.borderColor || "Blue",
      isActive: formState.isActive === 1 ? 1 : 0,
      parameters: (formState.parameters || []).map(p => {
        const paramPayload = {
          parameterName: p.parameterName,
          unit: p.unit || "",
          limit: p.limit || "",
        };
        //New user-added params are identified by '_tempId' and do not include the `parameterId` field.
        if (p.parameterId && !String(p.parameterId).startsWith("_temp")) {
          paramPayload.parameterId = p.parameterId;
        }
        return paramPayload;
      }),
    };
  };

  const handleEdit = testType => {
    setEditingId(testType.testTypeId);
    // deep copy
    setEditForm(JSON.parse(JSON.stringify(testType)));
  };

  const handleSave = async () => {
    if (!editingId || !editForm) return;

    try {
      const payload = buildPayload(editForm);
      console.log("Saving existing TestType payload:", payload);

      await testTypeService.update(editingId, payload);

      setEditingId(null);
      setEditForm({});
      await fetchTestTypes(); //refresh data
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  // isActive flip
  const handleToggleActive = async testTypeId => {
    if (!canEdit) return;

    const targetType = testTypes.find(tt => tt.testTypeId === testTypeId);
    if (!targetType) return;

    try {
      const payload = buildPayload(targetType);
      payload.isActive = targetType.isActive === 1 ? 0 : 1;

      console.log("Toggling active status payload:", payload);
      await testTypeService.update(testTypeId, payload);

      await fetchTestTypes();
    } catch (error) {
      console.error("Toggle active failed:", error);
      alert("Failed to update status.");
    }
  };

  const handleAddNew = async () => {
    if (!newTestType.typeName) {
      alert("Please fill in the Test Type Name");
      return;
    }

    try {
      const payload = buildPayload(newTestType);
      console.log("Creating new TestType payload:", payload);

      await testTypeService.create(payload);

      setIsAddingNew(false);
      setNewTestType(getInitialNewState());
      await fetchTestTypes();
    } catch (error) {
      console.error("Add new test type failed:", error);
      alert("Failed to create new Test Type.");
    }
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewTestType(getInitialNewState());
  };

  return {
    testTypes,
    loading,
    editingId,
    setEditingId,
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
  };
}
