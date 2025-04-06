import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetPageListTool(server: McpServer) {
  server.tool(
    'get page list',
    'get the page list of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const pageList = epub?.getPageList()
      if (!pageList) {
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
          text: JSON.stringify(pageList),
        }],
      }
    },
  )
}
