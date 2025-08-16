import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";

// Workshop agents for different labs
import { iotAgentBase } from "./agents/lab1-iot-agent-base"; // Lab1
import { memoryEnabledAgent } from "./agents/lab2-memory-agent"; // lab2
import { chickenCoopAgent } from "./agents/lab3|4-chicken-coop-agent"; //solution

export const mastra = new Mastra({
  workflows: {},
  agents: {
    // Workshop agents
    iotAgentBase, // Lab 1: Basic IoT agent
    memoryEnabledAgent, // Lab 2/: Agent with memory
    chickenCoopAgent, // Complete production agent
  },
  // storage: new LibSQLStore({
  //   // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
  //   url: ":memory:",
  // }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
