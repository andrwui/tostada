import { ReactNode } from 'react'

type Direction = 'center' | 'top' | 'bottom' | 'left' | 'right'

type Animation = {
  duration: {
    in: number
    out: number
  }
  size?: boolean
  fade?: boolean
  slide?: boolean
  origin?: Slide extends true
    ? Direction
    : `${Direction} ${Direction}` | Direction
}

export type Toast = {
  element: ReactNode | ReactElement
  options: {
    duration: number
    animation?: Animation
  }
}
