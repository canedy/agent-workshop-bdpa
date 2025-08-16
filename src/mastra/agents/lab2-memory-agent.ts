import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

// Lab 2: Agent with Memory capabilities
// This demonstrates how Mastra's memory system works

export const memoryEnabledAgent = new Agent({
  name: "Lab 2 IoT Memory Agent",
  // can you tell me what my order A1245 has on it?
  instructions: `
    You are an IoT monitoring agent with memory capabilities. Your role is to:
    - Monitor and remember sensor readings over time
    - Detect patterns and anomalies based on historical data
    - Recall previous readings when asked
    - Track trends and provide insights based on memory
    
    When you receive sensor data:
    1. Compare it with recent readings you remember
    2. Note any significant changes or patterns
    3. Store important information for future reference
    
    You have access to your memory to recall:
    - Previous sensor readings
    - Identified patterns or anomalies
    - Important events or thresholds crossed
    
    Use your memory to provide context-aware responses.
  `,
  model: openai("gpt-4o-mini"),
  memory: new Memory({
    // tell me last 2 weather events?
    storage: new LibSQLStore({
      url: "file:./workshop-memory.db", // Persistent memory for the workshop
    }),
  }),
});
