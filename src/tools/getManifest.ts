import type { ToolParamsObject } from './tool'
import { getEpubFile } from '../epub'

export const getManifest: ToolParamsObject = {
  name: 'get manifest',
  description: 'get the manifest of the initialized epub file',
  schema: {},
  cb: () => {
    const epub = getEpubFile()
    const manifest = epub?.getManifest()
    if (!manifest) {
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
        text: JSON.stringify(manifest),
      }],
    }
  },
}
