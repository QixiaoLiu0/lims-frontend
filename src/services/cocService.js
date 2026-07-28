import { http } from "../utils/request";

export const cocService = {
  create: cocFormData => {
    return http("/cocs", {
      method: "POST",
      body: cocFormData,
    });
  },

  getDashboardList: () => {
    return http("/cocs", { method: "GET" });
  },

  getDetail: cocId => {
    return http(`/cocs/${cocId}`, { method: "GET" });
  },

  appendSample: (cocId, sampleData) => {
    return http(`/cocs/${cocId}/samples`, {
      method: "POST",
      body: sampleData,
    });
  },

  delete: cocId => {
    return http(`/cocs/${cocId}/delete`, {
      method: "POST",
      body: {},
    });
  },
};
