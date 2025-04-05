import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index.ts'],
  failOnWarn: false,
  declaration: true,
  rollup: {
    emitCJS: false,
  },
})
