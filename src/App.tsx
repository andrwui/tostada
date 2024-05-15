import SimpleToast from './components/SimpleToast'
import { TostadaProvider, useTostada } from './ToastProvider'

function App() {
  return (
    <TostadaProvider
      options={{
        direction: 'down',
      }}
    >
      <div className="w-full flex items-center justify-center gap-10 h-16">
        <ToastButton />
        <ResetButton />
      </div>
    </TostadaProvider>
  )
}

export default App

const ToastButton = () => {
  const { addToast } = useTostada()

  const anadirtostada = () => {
    addToast({
      element: <SimpleToast>Toast sample</SimpleToast>,
      options: {
        duration: 3000,
        animation: {
          duration: {
            in: 200,
            out: 500,
          },
          size: true,
          origin: 'top',
        },
      },
    })
  }

  return (
    <button
      className="bg-gray-950 text-white font-semibold p-2 rounded-md"
      onClick={anadirtostada}
    >
      Make a toast
    </button>
  )
}
const ResetButton = () => {
  const { resetToasts } = useTostada()

  return (
    <button
      className="bg-gray-950 text-white font-semibold p-2 rounded-md"
      onClick={() => resetToasts()}
    >
      Reset toasts
    </button>
  )
}
