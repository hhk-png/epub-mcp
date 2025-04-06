import type { ToolParamsObject } from './tool'
import { getCollection } from './getCollection'
import { getManifest } from './getManifest'
import { getMetadata } from './getMetadata'
import { getNavList } from './getNavList'
import { getPageList } from './getPageList'
import { getSpine } from './getSpine'
import { getToc } from './getToc'
import { loadChapter } from './loadChapter'
import { resetOrInitEpub } from './resetOrInitEpub'

export const tools: ToolParamsObject[] = [
  resetOrInitEpub,
  loadChapter,
  getSpine,
  getToc,
  getMetadata,
  getManifest,
  getCollection,
  getNavList,
  getPageList,
]
