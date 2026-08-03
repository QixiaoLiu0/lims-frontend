import { http } from "../utils/request";

export const aiService = {
  /**
   * Send a natural language prompt to the backend AI routing
   * @param {Object} payload
   * @param {string} payload.prompt
   * @returns {Promise} - including `toolUsed`, `results`, `message`
   */
  sendChatMessage: ({ prompt }) => {
    return http("/ai-chat", {
      method: "POST",
      body: { prompt },
    });
  },
};
