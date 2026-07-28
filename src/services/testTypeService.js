import { http } from "../utils/request";

/**
 * this service needs user is a role of ADMIN or SUPER_ADMIN
 */
export const testTypeService = {
  create: testTypeData => {
    return http("/test-types", {
      method: "POST",
      body: testTypeData,
    });
  },

  getList: () => {
    return http("/test-types", { method: "GET" });
  },

  getDetail: id => {
    return http(`/test-types/${id}`, { method: "GET" });
  },

  update: (id, updateData) => {
    return http(`/test-types/${id}`, {
      method: "POST",
      body: updateData,
    });
  },
};
