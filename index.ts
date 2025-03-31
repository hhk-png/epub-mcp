import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
})

// Simple tool with parameters
server.tool(
  "calculate-bmi",
  "description",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }: { weightKg: number, heightM: number }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
)

// Dynamic resource with parameters
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport()
await server.connect(transport)