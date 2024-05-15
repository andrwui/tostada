import {
  CSSProperties,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Toast } from './tostada'

type TostadaContextType = {
  toasts: Toast[]
  addToast: (toast: Toast) => void
  resetToasts: () => void
}

const TostadaContext = createContext<TostadaContextType>(
  {} as TostadaContextType,
)

export const useTostada = () => {
  return useContext(TostadaContext)
}

type TostadaProviderProps = {
  children?: ReactNode[] | ReactNode | ReactElement
  options?: {
    direction?: 'down' | 'up'
  }
}

export const TostadaProvider = ({
  children,
  options,
}: TostadaProviderProps) => {
  const [toasts, setToasts] = useState([] as Toast[])

  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => {
      return [...prevToasts, toast]
    })
  }

  const resetToasts = () => {
    setToasts([])
  }

  return (
    <TostadaContext.Provider value={{ toasts, addToast, resetToasts }}>
      {children}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          flexDirection:
            options?.direction == 'up' ? 'column-reverse' : 'column',
        }}
      >
        {toasts.map((tostada) => {
          return (
            <ToastContainer tostada={tostada}>{tostada.element}</ToastContainer>
          )
        })}
      </div>
    </TostadaContext.Provider>
  )
}

type ToastContainerProps = {
  children: ReactNode | ReactElement
  tostada: Toast
}

const ToastContainer = ({ children, tostada }: ToastContainerProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const [transitionDuration, setTransitionDuration] = useState<number>()

  const { duration, animation } = tostada.options
  const { in: inDuration, out: outDuration } = animation!.duration

  useEffect(() => {
    setShouldRender(true)
    setTransitionDuration(inDuration)
    const showTransition = new Promise((resolve) => {
      setTimeout(() => {
        setIsVisible(true)
        resolve(null)
      }, inDuration || 200)
    })

    showTransition.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
          setTransitionDuration(outDuration)
        }, duration)
      })
        .then(() => {
          return new Promise((resolve) => {
            setIsVisible(false)
            setTimeout(() => {
              resolve(null)
            }, outDuration || 200)
          })
        })
        .then(() => setShouldRender(false))
    })
  }, [inDuration, outDuration, duration])

  const onTransitionEnd = () => {
    if (!isVisible) {
      setShouldRender(false)
    }
  }

  let slideDirections
  switch (animation?.origin?.split(' ')[0]) {
    case 'top':
      slideDirections = '0 -20%'
      break
    case 'right':
      slideDirections = '10% 0'
      break
    case 'left':
      slideDirections = '-10% 0'
      break
    case 'bottom':
      slideDirections = '0 20%'
      break
  }

  const toastContainerStyle: CSSProperties = {
    transition: `all ${transitionDuration || '500'}ms`,
    maxHeight: isVisible ? '1000px' : '0',
    overflow: 'hidden',
    width: 'auto',
  }

  const animations: Record<string, CSSProperties> = {
    fade: {
      opacity: isVisible ? 1 : 0,
    },
    size: {
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      transformOrigin: animation?.origin || 'center',
    },
    slide: {
      translate: isVisible ? '0 0' : slideDirections,
    },
  }

  return (
    shouldRender && (
      <div
        style={{
          ...toastContainerStyle,
          ...(animation?.fade && animations.fade),
          ...(animation?.size && animations.size),
          ...(animation?.slide && animations.slide),
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    )
  )
}
