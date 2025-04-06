import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetCollectionTool(server: McpServer) {
  server.tool(
    'get collection',
    'get the collection of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const collection = epub?.getCollection()

      if (!collection) {
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
          text: JSON.stringify(collection),
        }],
      }
    },
  )
}
