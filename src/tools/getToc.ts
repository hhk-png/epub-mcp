import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'
import { flatToc } from '../utils'

export const getToc: ToolParamsObject = {
  name: 'get table of contents',
  description: 'get the table of contents of the initialized epub file',
  schema: {},
  cb: () => {
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

}
