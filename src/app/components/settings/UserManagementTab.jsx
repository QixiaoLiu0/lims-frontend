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
  const handleUserSubmit = async e => {
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
  const getRoleInfo = roleStr => {
    const role = roleStr?.toUpperCase() || "STAFF";
    const defaultColor =
      "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

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
      <div className="p-6 text-red-500 font-medium">Unauthorized Access.</div>
    );
  }

  if (loading) {
    return <div className="p-6 text-slate-500">Loading user records...</div>;
  }

  return (
    <div>
      {/* add new user btn */}
      {!isAddingUser && (
        <button
          onClick={() => setIsAddingUser(true)}
          className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-500 dark:border-slate-600 rounded-xl hover:border-blue-400 hover:bg-blue-500/10 transition mb-3"
        >
          <UserPlus className="w-5 h-5 text-blue-400" />
          <span className="font-medium text-blue-400">Add New User</span>
        </button>
      )}

      {/* New User form*/}
      {isAddingUser && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-3 border border-slate-300 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Create New User
          </h3>
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  placeholder="John Doe"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="john@lab.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={e =>
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
                <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Initial Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e =>
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
                className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition shadow-lg"
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
                className="flex-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* existing users */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Existing Users ({users.length})
        </h3>
        <div className="space-y-3">
          {users.map(u => {
            const roleInfo = getRoleInfo(u.role);
            const RoleIcon = roleInfo.icon;

            // Check if currentlogged in user is Super Admin.
            const isSelf = currentUser?.email === u.email;

            return (
              <div
                key={u.userId}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`${roleInfo.color} p-3 rounded-lg`}>
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {`${u.firstName} ${u.lastName}`}
                    </p>
                    <p className="text-base text-gray-400 dark:text-slate-200">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isSelf ? (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}
                    >
                      {roleInfo.label} (You)
                    </span>
                  ) : (
                    <select
                      value={u.role.toUpperCase()}
                      onChange={e => handleUpdateRole(u.userId, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color} border-2 border-transparent hover:border-gray-400 transition cursor-pointer outline-none`}
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
