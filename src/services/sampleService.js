import { http } from "../utils/request";

export const sampleService = {
  getDetail: sampleId => {
    return http(`/samples/${sampleId}`, { method: "GET" });
  },

  appendTest: (sampleId, { testTypeId }) => {
    return http(`/samples/${sampleId}/tests`, {
      method: "POST",
      body: { testTypeId },
    });
  },

  delete: sampleId => {
    return http(`/samples/${sampleId}/delete`, {
      method: "POST",
      body: {},
    });
  },
};
