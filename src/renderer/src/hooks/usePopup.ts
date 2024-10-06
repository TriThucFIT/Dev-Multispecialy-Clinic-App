import toast, { ToastOptions } from 'react-hot-toast'

export const usePopup = (message: string, props?: ToastOptions) => {
  const defaultOptions: ToastOptions = {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#07b7f8',
      color: '#ffffff'
    }
  }
  return toast.custom(message, { ...defaultOptions, ...props })
}
