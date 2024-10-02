/* ./setup/shiki.ts */
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'rose-pine',
      light: 'min-light',
    },
    langs: [
      'js',
      'typescript',
      'cpp',
      'shell',
      // ...
    ],
    transformers: [
      // ...
    ],
  }
})