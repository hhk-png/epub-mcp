import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getSpine: ToolParamsObject = {
  name: 'get spine',
  description: 'Get the spine of the initialized epub file, which represents the reading order of the book.'
    + 'The id of the spine item is chapterId',
  inputSchema: {},
  cb: () => {
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
      content: spine.map(item => ({
        type: 'text',
        text: JSON.stringify(item),
      })),
    }
  },
}
