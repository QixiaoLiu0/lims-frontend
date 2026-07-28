import { http } from "../utils/request";

export const authService = {
  login: ({ email, password }) => {
    return http("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  },

  modifyPassword: ({ oldPassword, newPassword }) => {
    return http("/auth/password", {
      method: "POST",
      body: { oldPassword, newPassword },
    });
  },
};
