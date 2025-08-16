import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

// Base IoT Agent for Lab 1
// Students will modify the name and instructions during the lab
export const iotAgentBase = new Agent({
  name: "lab1 IoT Monitor Agent", // TODO: Students customize this
  instructions: `
    You are an IoT monitoring agent. Your primary role is to:
    - Monitor incoming sensor data from MQTT topics
    - Respond to sensor readings appropriately
    
    TODO: Students will add more specific instructions here for their use case
  `,
  model: openai("gpt-4o-mini"),
});
