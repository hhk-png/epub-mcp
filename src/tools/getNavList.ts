import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetNavListTool(server: McpServer) {
  server.tool(
    'get nav list',
    'get the nav list of the initialized epub file',
    {},
    () => {
      const epub = getEpubFile()
      const navList = epub?.getNavList()
      if (!navList) {
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
          text: JSON.stringify(navList),
        }],
      }
    },
  )
}
