# Chicken Coop IoT Agent Workshop

## Project Overview

This is a Mastra-based IoT workshop for building intelligent agents that manage a chicken coop. The project demonstrates AI agent development with real-time IoT sensor data, memory persistence, human-in-the-loop controls, and MQTT messaging. Built with TypeScript and the Mastra framework for AI agents and workflows.

## Setup

1. Start Mastra playground: `pnpm run dev`
2. Open browser to playground URL
3. Login to HiveMQ to simulate the IOT device messages

## Available Agents in Playground

### Lab 1: `IoT Monitor Agent`

Basic IoT agent with logging capability. Students will customize the name and instructions.

**Example prompt sequence:**

1. The morning temperature was 65°F at 8 AM
2. What was the temperature this morning? ❌ _Agent can't remember_
3. Temperature is now 85°F at 2 PM. How much has it changed? ❌ _No historical context_
4. Should we be concerned about the temperature pattern today? ❌ _No memory of previous readings_

This shows why Lab 2's memory is essential!

### Lab 2: `Iot Memory Agent`

Agent with persistent memory to track patterns over time.

**Example prompt sequence:**

1. The morning temperature was 65°F at 8 AM
2. What was the temperature this morning? ✅ _Agent can now remember_
3. Temperature is now 85°F at 2 PM. How much has it changed? ✅ _Agent now has historical context_
4. Should we be concerned about the temperature pattern today? ✅ _Can see previous readings_

### Lab 3 & 4: `Chicken Coop Manager`

Full production agent with temperature monitoring, feeding schedules, and memory.

**Lab 3 - Tool Usage Flow:**

1. Check if current temperature is safe → Uses `coopTempAlert` tool with real MQTT data
2. When should the chickens be fed next? → Uses `feedSchedule` tool
3. Temperature is 98°F, what should we do? → Multi-tool response with alerts

**Lab 4 - Human-in-the-Loop Flow:**

1. Schedule feeding in 3 hours → Triggers approval request (visible in playground)
2. Agent shows: 🔔 HUMAN APPROVAL REQUIRED with action details
3. When user says "yes" to feeding → Agent uses `feederControl` tool automatically
4. When user says "no" → Agent logs decision and suggests alternatives

## Testing Your Workshop Flow

### Step 1: Connect to MQTT

Connect to MQTT broker using the default connection and then Subscribe to sensors/coop/temp

### Step 2: Send Test Data via HiveMQ Console

```json
// Topic: sensors/coop/temp
{
  "temperature": 72,
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Step 3: Test Temperature Monitoring

Check if current temperature is safe

- Agent uses real MQTT data (not simulated!)
- Returns safety assessment with recommendations

<!-- ### Step 4: Test Feeding Flow

When should the chickens be fed next?

- Agent calculates feeding schedule
- When you say "yes" → Automatically opens feeder via MQTT command
- When you say "no" → Logs decision and offers alternatives

### Step 5: Test Human-in-the-Loop

Schedule feeding in 3 hours

- Triggers approval request visible in playground UI
- Shows detailed risk assessment and safety warnings
- Demonstrates human approval workflow -->

### Step 6: Test Multi-Action Response

Temperature is 98°F, what should we do?

- Agent uses multiple tools: temperature alert, environmental controls, logging
- Provides comprehensive response with action plan including:
  - Increase ventilation to cool the coop
  - Provide fresh water for hydration
  - Extend awning for shade
  - Monitor temperature trends

## Additional Test Data Examples

```json
// High temperature alert: sensors/coop/temp
{"temperature": 98, "timestamp": "2024-01-15T14:00:00Z"}

// Low temperature alert: sensors/coop/temp
{"temperature": 32, "timestamp": "2024-01-15T06:00:00Z"}

// Humidity: sensors/coop/humidity
{"humidity": 65, "timestamp": "2024-01-15T10:05:00Z"}

// Door status: sensors/coop/door
{"status": "open", "timestamp": "2024-01-15T10:10:00Z"}
```

## Environmental Control Test Commands

After connecting to MQTT and publishing temperature data, try these:

**High Temperature Scenario (98°F):**

- "The temperature is dangerous, take action immediately"
- Agent will recommend and can execute:
  - Increase ventilation
  - Provide fresh water
  - Extend awning for shade

**Low Temperature Scenario (32°F):**

- "It's freezing, what should we do?"
- Agent will recommend:
  - Reduce ventilation
  - Retract awning
  - Check heating systems

**Manual Controls:**

- "Increase ventilation to 75%"
- "Provide fresh water for the chickens"
- "Extend the awning for shade"

## Querying Historical Data

- "What temperature readings do we have from today?"
- "Show me all sensor data from shared memory"
- "Check shared memory for recent temperature readings"

## Lab Progression

### Lab 1: Build a Simple Agent that Acts

- Students modify `iotAgentBase` name and instructions
- Connect to MQTT and show message → agent → tool flow
- Use the `logTool` to process sensor readings

### Lab 2: Memory

- Switch to `memoryEnabledAgent`
- Send related prompts to demonstrate recall
- Discuss why memory beats giant prompts

### Lab 3: Tooling

- Switch to `chickenCoopAgent`
- Explore `coopTempAlert` tool (temp safety checks)
- Explore `feedSchedule` tool (feeding management)
- Tools have built-in validation and rate limiting

### Lab 4: Human-in-the-Loop

- Continue with `chickenCoopAgent`
- Trigger approval scenarios by asking for short feeding intervals (< 6 hours)
- Approval requests now display in the playground UI (not just console)
- Shows detailed risk assessments and safety warnings
- Demonstrates human approval workflow for edge cases

## Key Files Structure

- `src/mastra/agents/` - All workshop agents
  - `lab1-iot-agent-base.ts` - Lab 1: Basic logging agent
  - `lab2-memory-agent.ts` - Lab 2: Agent with memory
  - `lab3|4-chicken-coop-agent.ts` - Labs 3&4: Complete production agent
- `src/mastra/tools/` - Organized tool categories
  - **Utility Tools:** (`utils/` directory)
    - `log-event.ts` - Universal logging tool
    - `shared-memory-tool.ts` - Cross-thread sensor data access
    - `approval-request.ts` - Human-in-the-loop approval (playground visible)
  - **MQTT Tools:** (`mqtt/` directory)
    - `mqtt-connection.ts` - MQTT broker connection
    - `mqtt-subscribe.ts` - MQTT topic subscription with auto-memory storage
    - `mqtt-publish.ts` - MQTT message publishing
  - **Chicken Coop Tools:** (`chicken-coop/` directory)
    - `coop-temp-alert.ts` - Temperature monitoring with real MQTT data
    - `feed-schedule.ts` - Feeding schedule with approval logic
    - `feeder-control.ts` - IoT feeder control via MQTT
    - `coop-controls.ts` - Environmental controls (ventilation, water, awning)

## Environment Requirements

Create `.env` file:

```
HIVEMQ_BROKER_URL=your_hivemq_url
HIVEMQ_USERNAME=your_username
HIVEMQ_PASSWORD=your_password
```

## Resources & Documentation

### Mastra Framework
- [Mastra Documentation](https://mastra.dev/docs) - Official documentation for the Mastra AI agent framework
- [Mastra GitHub](https://github.com/mastra-ai/mastra) - Source code and examples
- [Mastra Playground](https://mastra.dev/playground) - Interactive playground for testing agents

### MQTT & IoT
- [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/) - Cloud-based MQTT broker for IoT messaging
- [MQTT.org](https://mqtt.org/) - MQTT protocol documentation and best practices
- [MQTT Explorer](https://mqtt-explorer.com/) - Desktop tool for debugging MQTT messages

### AI Agent Development
- [LangChain Documentation](https://python.langchain.com/docs) - Concepts and patterns for building AI agents
- [OpenAI API Reference](https://platform.openai.com/docs) - GPT model documentation
- [Anthropic Claude](https://www.anthropic.com/claude) - Alternative LLM for agent development

### TypeScript & Node.js
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official TypeScript documentation
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Comprehensive guide to Node.js development
- [pnpm Documentation](https://pnpm.io/) - Fast, disk space efficient package manager

### Workshop Materials
- [WORKSHOP_GUIDE.md](./WORKSHOP_GUIDE.md) - Complete workshop instructions and lab exercises
- [CLAUDE.md](./CLAUDE.md) - Project guidance for Claude Code AI assistant
- [Workshop Slides](https://docs.google.com/presentation) - _(Add link to presentation materials)_

### Related Projects
- [IoT Agent Examples](https://github.com/mastra-ai/examples) - Collection of Mastra agent examples
- [MQTT Chicken Coop](https://github.com/topics/chicken-coop-automation) - Similar IoT chicken coop projects
- [Smart Agriculture IoT](https://github.com/topics/smart-agriculture) - Agricultural IoT applications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Thanks to the Mastra team for providing an excellent AI agent framework
- HiveMQ for providing reliable MQTT cloud services
- The open-source community for continuous inspiration and support
- BDPA for hosting the workshop and supporting STEM education
