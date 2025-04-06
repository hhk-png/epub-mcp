import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetSpineTool(server: McpServer) {
  server.tool(
    'get spine',
    'get the spine of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const spine = epub?.getSpine()

      if (!spine) {
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
          text: JSON.stringify(spine),
        }],
      }
    },
  )
}
