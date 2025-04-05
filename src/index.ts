import process from 'node:process'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import mcpServer from './server'

async function runServer() {
  const transport = new StdioServerTransport()
  await mcpServer.connect(transport)
}

runServer().catch((e) => {
  console.error('Fatal error running server:', e)
  process.exit(1)
})
