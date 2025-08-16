# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mastra-based IoT workshop for building intelligent agents that manage a chicken coop. The project demonstrates AI agent development with real-time IoT sensor data, memory persistence, human-in-the-loop controls, and MQTT messaging. Built with TypeScript and the Mastra framework for AI agents and workflows.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the project
npm run build

# Start production server
npm run start

# Type checking
npx tsc --noEmit
```

## Architecture

### Core Components

The workshop includes three progressive lab agents, each building on the previous:

1. **Lab 1: IoT Monitor Agent** (`src/mastra/agents/lab1-iot-agent-base.ts`): Basic IoT agent with simple logging capability, demonstrates agent-tool interaction without memory.

2. **Lab 2: Memory-Enabled Agent** (`src/mastra/agents/lab2-memory-agent.ts`): Adds persistent memory using LibSQL to track sensor patterns and historical data over time.

3. **Lab 3/4: Chicken Coop Manager** (`src/mastra/agents/lab3|4-chicken-coop-agent.ts`): Full production agent with temperature monitoring, feeding schedules, environmental controls, and human-in-the-loop approval workflows.

### Key Technical Details

- **Node Version**: Requires Node.js >= 20.9.0
- **Module System**: ESM (ES modules)
- **TypeScript**: Strict mode enabled, targets ES2022
- **Storage**: Uses LibSQL for agent memory persistence (configurable between in-memory and file-based)
- **Logging**: Pino logger integrated for structured logging
- **MQTT Integration**: HiveMQ broker for real-time IoT sensor data and device control
- **External APIs**: Weather API for environmental monitoring (optional)

### Tool Categories

**Utility Tools** (`src/mastra/tools/utils/`):
- `log-event.ts` - Universal event logging
- `shared-memory-tool.ts` - Cross-thread sensor data access
- `approval-request.ts` - Human-in-the-loop approval system

**MQTT Tools** (`src/mastra/tools/mqtt/`):
- `mqtt-connection.ts` - Broker connection management
- `mqtt-subscribe.ts` - Topic subscription with auto-memory storage
- `mqtt-publish.ts` - Message publishing for device control

**Chicken Coop Tools** (`src/mastra/tools/chicken-coop/`):
- `coop-temp-alert.ts` - Temperature monitoring with safety thresholds
- `feed-schedule.ts` - Feeding schedule with approval logic
- `feeder-control.ts` - IoT feeder control via MQTT
- `coop-controls.ts` - Environmental controls (ventilation, water, awning)

## Configuration Notes

- Memory storage defaults to in-memory (`:memory:`) in `src/mastra/index.ts` - change to `file:../mastra.db` for persistence
- Agent memory uses file-based storage (`file:../mastra.db`) for conversation history
- MQTT broker requires HiveMQ credentials in `.env` file (see WORKSHOP_GUIDE.md)
- Shared memory enables cross-thread communication between MQTT subscriptions and agent tools
- Temperature thresholds: Safe range is 40-90°F for chicken health