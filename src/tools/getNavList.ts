import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getNavList: ToolParamsObject = {
  name: 'get nav list',
  description: 'get the nav list of the initialized epub file',
  inputSchema: {},
  cb: () => {
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
}
