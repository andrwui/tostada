import { CSSProperties } from 'react'

export const fade: CSSProperties = {
  transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
  opacity: isVisible ? 1 : 0,
}
