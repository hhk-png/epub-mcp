import type { EpubFile, EpubSpine, EpubToc } from '@lingo-reader/epub-parser'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { initEpubFile } from '@lingo-reader/epub-parser'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { flatToc } from './utils.js'

// Create an MCP server
const server = new McpServer({
  name: 'Read content from epub file.',
  version: '0.0.2',
})

let epubFile: EpubFile
let toc: EpubToc
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
      toc = epubFile.getToc()
      spine = epubFile.getSpine()
      return {
        content: [{
          type: 'text',
          text: `Epub file initialized from ${filePath}`,
        }],
      }
    }
    catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error initializing epub file: ${e}`,
        }],
      }
    }
  },
)

server.tool(
  'get spine',
  'get the spine of the initialized epub file',
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
    const flattedToc = flatToc(toc)
    return {
      content: flattedToc.map(item => ({
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
  'get the file info of the initialized epub file',
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

// process.on("SIGINT", () => {
//   epubFile.destroy()
//   console.log("SIGINT received, shutting down...")
//   server.close().then(() => {
//     console.log("Server closed.")
//     process.exit(0)
//   })
// })

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

// // Simple tool with parameters
// server.tool(
//   "calculate-bmi",
//   "description",
//   {
//     weightKg: z.number(),
//     heightM: z.number()
//   },
//   async ({ weightKg, heightM }: { weightKg: number, heightM: number }) => {
//     return {
//       content: [{
//         type: "text",
//         text: String(weightKg / (heightM * heightM))
//       }]
//     }
//   }
// )

// // Dynamic resource with parameters
// server.resource(
//   "greeting",
//   new ResourceTemplate("greeting://{name}", { list: undefined }),
//   async (uri, { name }) => ({
//     contents: [{
//       uri: uri.href,
//       text: `Hello, ${name}!`
//     }]
//   })
// )

async function runServer() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

runServer().catch((e) => {
  console.error('Fatal error running server:', e)
  process.exit(1)
})
