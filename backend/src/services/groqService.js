const OpenAI = require("openai");
const env = require("../config/env");

const client = new OpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

module.exports = client;