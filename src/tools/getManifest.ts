import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetManifestTool(server: McpServer) {
  server.tool(
    'get manifest',
    'get the manifest of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const manifest = epub?.getManifest()
      if (!manifest) {
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
          text: JSON.stringify(manifest),
        }],
      }
    },
  )
}
