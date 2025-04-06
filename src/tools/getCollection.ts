import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getCollection: ToolParamsObject = {
  name: 'get collection',
  description: 'get the collection of the initialized epub file',
  inputSchema: {},
  cb: () => {
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
}
