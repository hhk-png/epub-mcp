import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { addTools } from './tools/index'

// Create an MCP server
const mcpServer = new McpServer({
  name: 'Read content from epub file.',
  version: '0.0.2',
})

// Add tools to the server
addTools(mcpServer)

export default mcpServer
