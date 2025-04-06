import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getMetadata: ToolParamsObject = {
  name: 'get metadata',
  description: 'get the metadata of the initialized epub file',
  inputSchema: {},
  cb: () => {
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
}
