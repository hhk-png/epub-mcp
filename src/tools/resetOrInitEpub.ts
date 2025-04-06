import type { ToolParamsObject } from './tool'
import { initEpubFile } from '@lingo-reader/epub-parser'
import { z } from 'zod'
import { destroyEpubFile, existsEpubFile, setEpubFile } from '../epub'

export const resetOrInitEpub: ToolParamsObject = {
  name: 'resetOrInitEpub',
  description: 'initialize or reset the epub file',
  inputSchema: {
    filePath: z.string(),
  },
  cb: async ({ filePath }) => {
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
}
