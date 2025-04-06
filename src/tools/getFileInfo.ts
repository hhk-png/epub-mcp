import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { getEpubFile } from '../epub'

export function addGetFileInfoTool(server: McpServer) {
  server.tool(
    'get file info',
    'Get the file info of the initialized epub file, which includes the mime type and the file name',
    {},
    () => {
      const epub = getEpubFile()
      const fileInfo = epub?.getFileInfo()
      if (!fileInfo) {
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
          text: JSON.stringify(fileInfo),
        }],
      }
    },
  )
}
