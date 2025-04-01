import { EpubToc } from "@lingo-reader/epub-parser"

export function flatToc(toc: EpubToc): EpubToc {
  const flat: EpubToc = []
  function flatten(toc: EpubToc) {
    toc.forEach((item) => {
      flat.push(item)
      if (item.children) {
        flatten(item.children)
      }
    })
  }
  flatten(toc)
  return flat
}