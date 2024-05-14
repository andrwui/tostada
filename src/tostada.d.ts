import { ReactNode } from 'react'

export type Toast = {
  element: ReactNode | ReactElement
  options?: {
    duration: number
    animation?: {
      speed: number
      type?: 'fade' | 'fade_up' | 'fade_down' | 'fade_left' | 'fade_right'
    }
  }
}
