import type { ToolParamsObject } from './tool'
import { readFileSync } from 'node:fs'
import { z } from 'zod'
import { getEpubFile } from '../epub'

export const loadChapter: ToolParamsObject = {
  name: 'load chapter',
  description: 'load the chapter of the initialized epub file',
  schema: {
    chapterId: z.string(),
  },
  cb: async ({ chapterId }) => {
    try {
      const epub = getEpubFile()
      const chapter = await epub?.loadChapter(chapterId)
      if (!chapter) {
        return {
          content: [{
            type: 'text',
            text: `Chapter ${chapterId} not found`,
          }],
        }
      }
      const { css, html } = chapter
      return {
        content: [
          ...css.map(item => ({
            type: 'resource' as const,
            resource: {
              text: readFileSync(item.href, 'utf-8'),
              uri: item.href,
              mimeType: 'text/css',
            },
          })),
          {
            type: 'text' as const,
            text: html,
          },
        ],
      }
    }
    catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error loading chapter ${chapterId}: ${e}`,
        }],
      }
    }
  },
}
