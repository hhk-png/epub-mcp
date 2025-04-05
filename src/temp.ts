import type { EpubFile, EpubSpine, NavPoint } from '@lingo-reader/epub-parser'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { initEpubFile } from '@lingo-reader/epub-parser'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import pkg from '../package.json'
import { flatToc } from './utils'

// Create an MCP server
const server = new McpServer({
  name: 'Read content from epub file.',
  version: pkg.version,
})

let epubFile: EpubFile
let toc: Omit<NavPoint, 'children'>[]
let spine: EpubSpine
server.tool(
  'resetOrInitEpub',
  'initialize or reset the epub file',
  {
    filePath: z.string(),
  },
  async ({ filePath }: { filePath: string }) => {
    try {
      if (epubFile) {
        epubFile.destroy()
      }
      epubFile = await initEpubFile(filePath, './images')
      toc = flatToc(epubFile.getToc())
      spine = epubFile.getSpine()
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
)

server.tool(
  'get <spine>',
  'Get the spine of the initialized epub file, which represents the reading order of the book.'
  + 'The id of the spine item is chapterId',
  {},
  () => {
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
)

server.tool(
  'load chapter',
  'load the chapter of the initialized epub file',
  {
    chapterId: z.string(),
  },
  async ({ chapterId }: { chapterId: string }) => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    try {
      const { css, html } = await epubFile.loadChapter(chapterId)
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
)

server.tool(
  'get table of contents',
  'get the table of contents of the initialized epub file',
  {},
  () => {
    if (!toc) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    return {
      content: toc.map(item => ({
        type: 'text',
        text: JSON.stringify(item),
      })),
    }
  },
)

server.tool(
  'get metadata',
  'get the metadata of the initialized epub file',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const metadata = epubFile.getMetadata()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(metadata),
      }],
    }
  },
)

server.tool(
  'get manifest',
  'get the manifest of the initialized epub file',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const manifest = epubFile.getManifest()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(manifest),
      }],
    }
  },
)

server.tool(
  'get collection',
  'get the collection of the initialized epub file',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const collection = epubFile.getCollection()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(collection),
      }],
    }
  },
)

server.tool(
  'get nav list',
  'get the nav list of the initialized epub file',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const navList = epubFile.getNavList()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(navList),
      }],
    }
  },
)

server.tool(
  'get page list',
  'get the page list of the initialized epub file',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const pageList = epubFile.getPageList()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(pageList),
      }],
    }
  },
)

server.tool(
  'getFileInfo',
  'Get the file info of the initialized epub file, which includes the mime type and the file name',
  {},
  () => {
    if (!epubFile) {
      return {
        content: [{
          type: 'text',
          text: 'Epub file not initialized',
        }],
      }
    }
    const fileInfo = epubFile.getFileInfo()
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(fileInfo),
      }],
    }
  },
)

/*
  tool:
    resetOrInitEpub(filePath: string, resourceSaveDir?: string): void
    loadChapter(chapterId: string): EpubChapter
    resolveHref(innerHref: string): EpubResolvedHref
  resource:
    getFileInfo(): EpubFileInfo
    getMetadata(): EpubMetadata
    getManifest(): EpubManifest
    getSpine(): EpubSpine
    getCollection(): EpubCollection
    getToc(): EpubToc
    getPageList(): EpubPageList
    getNavList(): EpubNavList

  other:
    destroy
    */

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

runServer().catch((e) => {
  console.error('Fatal error running server:', e)
  process.exit(1)
})
