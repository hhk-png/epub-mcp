import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getFileInfo: ToolParamsObject = {
  name: 'get file info',
  description: 'Get the file info of the initialized epub file, which includes the mime type and the file name',
  inputSchema: {},
  cb: () => {
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
}
