import { http } from "../utils/request";

export const testTaskService = {
  getResults: testId => {
    return http(`/tests/${testId}/results`, { method: "GET" });
  },

  saveResults: (testId, payload) => {
    return http(`/tests/${testId}/results/save`, {
      method: "POST",
      body: payload,
    });
  },

  delete: testId => {
    return http(`/tests/${testId}/delete`, {
      method: "POST",
      body: {},
    });
  },
};
