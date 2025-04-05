import type { ToolParamsObject } from './tool'
import { getManifest } from './getManifest'
import { getMetadata } from './getMetadata'
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
]
