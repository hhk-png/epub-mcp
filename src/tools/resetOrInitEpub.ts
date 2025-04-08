import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { initEpubFile } from '@lingo-reader/epub-parser'
import { z } from 'zod'
import { destroyEpubFile, existsEpubFile, setEpubFile } from '../epub'

export function addResetOrInitEpubTool(server: McpServer) {
  server.tool(
    'reset or init epub',
    'Initialize or reset the epub file. This tool must be called before any other tool that uses the epub file.',
    {
      filePath: z.string(),
    },
    async ({ filePath }) => {
      try {
        if (existsEpubFile()) {
          destroyEpubFile()
        }
        const epub = await initEpubFile(filePath, './images')
        setEpubFile(epub)
        return {
          content: [{
            type: 'text',
            text: `Epub file successfully initialized from ${filePath}`,
          }],
        }
      }
      catch (e) {
        return {
          content: [{
            type: 'text',
            text: `Error initializing epub file: ${filePath} \nwith error: ${e}`,
          }],
        }
      }
    },
  )
}
