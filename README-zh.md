本项目是一个epub文件相关的mcp，提供了读取epub文件内容的 mcp tool：

**reset or init epub（initEpubFile）**

**参数：**

- `filePath`: 文件在文件系统中的绝对路径

**返回值**：

- void

**get collection-（getCollection）**

**get file info-（getFileInfo）**

**get manifest-（getManifest）**

**get metadata-（getMetadata）**

**get nav list-（getNavList）**

**get page list-（getPageList）**

**get spine-（getSpine）**

**get table of contents-（getToc）**

**load chapter-（loadChapter）**

**参数：**

- none

以上各tool的详细解释可以查看：[https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md](https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md)，本mcp只是简单的调用了一下 `@lingo-reader/epub-parser` 的api。
