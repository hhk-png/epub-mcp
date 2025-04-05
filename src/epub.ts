import type { EpubFile } from '@lingo-reader/epub-parser'

let epub: EpubFile | undefined

export function getEpubFile() {
  return epub
}

export function setEpubFile(file: EpubFile) {
  epub = file
}

export function existsEpubFile() {
  return epub !== undefined
}

export function destroyEpubFile() {
  epub?.destroy()
  epub = undefined
}
