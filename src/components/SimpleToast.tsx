import { ReactNode } from 'react'

const SimpleToast = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-1/4 bg-gray-950 rounded-lg border-white border-2 p-4 text-white">
      {children}
    </div>
  )
}

export default SimpleToast
