import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'
import { flatToc } from '../utils'

export function addGetTocTool(server: McpServer) {
  server.tool(
    'get table of contents',
    'get the table of contents of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const toc = epub?.getToc()
      if (!toc) {
        return {
          content: [{
            type: 'text',
            text: 'Epub file maybe not initialized',
          }],
        }
      }

      const flattedToc = flatToc(toc)
      return {
        content: flattedToc.map(item => ({
          type: 'text',
          text: JSON.stringify(item),
        })),
      }
    },
  )
}
