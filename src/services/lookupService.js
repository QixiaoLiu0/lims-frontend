import { http } from "../utils/request";

export const lookupService = {
  getActiveTestTypes: () => {
    return http("/lookup/test-types", { method: "GET" });
  },

  getSampleTypes: () => {
    return http("/lookup/sample-types", { method: "GET" });
  },
};
