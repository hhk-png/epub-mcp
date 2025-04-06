import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getPageList: ToolParamsObject = {
  name: 'get page list',
  description: 'get the page list of the initialized epub file',
  inputSchema: {},
  cb: () => {
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
}
