import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { addGetCollectionTool } from './getCollection'
import { addGetManifestTool } from './getManifest'
import { addGetMetadataTool } from './getMetadata'
import { addGetNavListTool } from './getNavList'
import { addGetPageListTool } from './getPageList'
import { addGetSpineTool } from './getSpine'
import { addGetTocTool } from './getToc'
import { addLoadChapterTool } from './loadChapter'
import { addResetOrInitEpubTool } from './resetOrInitEpub'

export function addTools(server: McpServer) {
  addResetOrInitEpubTool(server)
  addGetSpineTool(server)
  addLoadChapterTool(server)
  addGetTocTool(server)
  addGetMetadataTool(server)
  addGetManifestTool(server)
  addGetCollectionTool(server)
  addGetNavListTool(server)
  addGetPageListTool(server)
}
