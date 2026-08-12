import React, { useState, useEffect, useCallback } from "react";
import { UserPlus, Users, Shield } from "lucide-react";
import { useUser } from "@/app/contexts/UserContext";
import { userService } from "@/services/userService";

export default function UserManagementTab({ inputCls }) {
  const { user: currentUser } = useUser();
  const isSuperAdmin = currentUser?.role?.toUpperCase() === "SUPER_ADMIN";

  // fetched users list from api
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "STAFF",
    password: "",
  });

  const fetchUsers = useCallback(async () => {
    if (!isSuperAdmin) return;

    setLoading(true);
    try {
      const res = await userService.getAllUsers();
      //defense programming
      const data = res?.data || res || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [isSuperAdmin]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // create user
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    // split Full Name
    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "Unknown";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    try {
      await userService.createUser({
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
        role: formData.role,
      });

      // reset form and do refresh
      setFormData({ fullName: "", email: "", role: "STAFF", password: "" });
      setIsAddingUser(false);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Error creating user: " + error.message);
    }
  };

  // update role
  const handleUpdateRole = async (targetUserId, newRole) => {
    if (!isSuperAdmin) return;
    try {
      await userService.updateUserRole(targetUserId, { role: newRole });
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Error updating role.");
      await fetchUsers();
    }
  };

  // role & icon mapping
  const getRoleInfo = (roleStr) => {
    const role = roleStr?.toUpperCase() || "STAFF";
    const defaultColor =
      "bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-200";

    switch (role) {
      case "STAFF":
        return { label: "Staff", color: defaultColor, icon: Users };
      case "ADMIN":
        return { label: "Admin", color: defaultColor, icon: Shield };
      case "SUPER_ADMIN":
      case "SUPERADMIN":
        return { label: "Super Admin", color: defaultColor, icon: Shield };
      default:
        return { label: "Unknown", color: defaultColor, icon: Users };
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-6 text-red-500 dark:text-red-500 font-medium text-sm">
        Unauthorized Access.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-200 text-sm font-medium">
        Loading user records...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* add new user btn */}
      {!isAddingUser && (
        <button
          onClick={() => setIsAddingUser(true)}
          className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
        >
          <UserPlus className="w-5 h-5 text-blue-500 dark:text-blue-500" />
          <span className="font-semibold text-sm text-blue-500 dark:text-blue-500 leading-tight">
            Add New User
          </span>
        </button>
      )}

      {/* New User form*/}
      {isAddingUser && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-5 text-lg leading-tight">
            Create New User
          </h3>
          <form onSubmit={handleUserSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2 leading-tight">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  placeholder="John Doe"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2 leading-tight">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="john@lab.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2 leading-tight">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className={inputCls}
                >
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2 leading-tight">
                  Initial Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow-sm border border-gray-200 dark:border-transparent leading-tight"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingUser(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    role: "STAFF",
                    password: "",
                  });
                }}
                className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm font-medium py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors leading-tight"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* existing users */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 text-lg leading-tight">
          Existing Users ({users.length})
        </h3>
        <div className="space-y-3">
          {users.map((u) => {
            const roleInfo = getRoleInfo(u.role);
            const RoleIcon = roleInfo.icon;

            // Check if currentlogged in user is Super Admin.
            const isSelf = currentUser?.email === u.email;

            return (
              <div
                key={u.userId}
                className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-sm transition-all"
                >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div
                    className={`shrink-0 ${roleInfo.color} p-2.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600/50`}
                  >
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-200 leading-tight mb-0.5 truncate">
                      {`${u.firstName} ${u.lastName}`}
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200 leading-tight truncate">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-32 sm:w-36">
                  {isSelf ? (
                    <span
                      className={`flex items-center justify-center w-full px-2 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold leading-tight ${roleInfo.color} border border-gray-200 dark:border-gray-600 truncate`}
                    >
                      {roleInfo.label} (You)
                    </span>
                  ) : (
                    <select
                      value={u.role.toUpperCase()}
                      onChange={(e) =>
                        handleUpdateRole(u.userId, e.target.value)
                      }
                      className={`w-full px-2 py-1.5 rounded-full text-xs font-semibold leading-tight ${roleInfo.color} border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 truncate`}
                    >
                      <option value="STAFF">Staff</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
