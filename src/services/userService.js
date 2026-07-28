import { http } from "../utils/request";

export const userService = {
  // API 14: Get All Users (Super Admin Only)
  getAllUsers: () => {
    return http("/user", {
      method: "GET",
    });
  },

  // API 15: New A User (Super Admin Only)
  createUser: ({ email, password, firstName, lastName, role }) => {
    return http("/user", {
      method: "POST",
      body: { email, password, firstName, lastName, role },
    });
  },

  // API 16: Update User's Role (Super Admin Only)
  updateUserRole: (userId, { role }) => {
    return http(`/user/${userId}/role`, {
      method: "POST",
      body: { role },
    });
  },
};
