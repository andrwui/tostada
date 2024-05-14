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

  return (
    <TostadaContext.Provider value={{ toasts, addToast }}>
      {children}
      <div
        style={{
          display: 'flex',
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

  const { options } = tostada

  useEffect(() => {
    setShouldRender(true)
    const transition = setTimeout(() => {
      setIsVisible(true)
    }, options?.animation?.speed || 200)

    const duration = setTimeout(() => {
      setIsVisible(false)
    }, options?.duration || 2000)

    return () => {
      clearTimeout(transition)
      clearTimeout(duration)
    }
  }, [options?.animation?.speed, options?.duration])

  const onTransitionEnd = () => {
    if (!isVisible) {
      setShouldRender(false)
    }
  }

  const animations: Record<string, CSSProperties> = {
    fade: {
      transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
      opacity: isVisible ? 1 : 0,
    },
    fade_up: {
      transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
      opacity: isVisible ? 1 : 0,
      translate: isVisible ? '0 0' : '0 15% ',
    },
    fade_down: {
      opacity: isVisible ? 1 : 0,
      translate: isVisible ? '0 0' : '0 -15% ',
    },
    fade_left: {
      transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
      opacity: isVisible ? 1 : 0,
      translate: isVisible ? '0 0' : '-1% 0',
    },
    fade_right: {
      transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
      opacity: isVisible ? 1 : 0,
      translate: isVisible ? '0 0' : '1% 0',
    },
  }

  const animation = options?.animation?.type
    ? animations[options?.animation?.type]
    : animations.fade

  return (
    shouldRender && (
      <div
        style={{
          ...animation,
          transition: `all ${tostada.options?.animation?.speed || '500'}ms`,
          maxHeight: isVisible ? '1000px' : '0',
          overflow: 'hidden',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    )
  )
}
