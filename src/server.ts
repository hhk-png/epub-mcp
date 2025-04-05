import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { tools } from './tools/index'

// Create an MCP server
const mcpServer = new McpServer({
  name: 'Read content from epub file.',
  version: '0.0.2',
})

tools.forEach((tool) => {
  mcpServer.tool(
    tool.name,
    tool.description,
    tool.schema,
    tool.cb,
  )
})

export default mcpServer
