import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetMetadataTool(server: McpServer) {
  server.tool(
    'get metadata',
    'get the metadata of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const metadata = epub?.getMetadata()
      if (!metadata) {
        return {
          content: [{
            type: 'text',
            text: 'Epub file not initialized',
          }],
        }
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(metadata),
        }],
      }
    },
  )
}
