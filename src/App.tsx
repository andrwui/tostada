import SimpleToast from './components/SimpleToast'
import { TostadaProvider, useTostada } from './ToastProvider'

function App() {
  return (
    <TostadaProvider
      options={{
        direction: 'down',
      }}
    >
      <Button />
    </TostadaProvider>
  )
}

export default App

const Button = () => {
  const { addToast } = useTostada()

  const anadirtostada = () => {
    addToast({
      element: <SimpleToast>Hello there!</SimpleToast>,
      options: {
        duration: 2000,
        animation: {
          speed: 300,
          type: 'fade_down',
        },
      },
    })
  }

  return <button onClick={anadirtostada}>Make a tostada!</button>
}
