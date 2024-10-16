import toast, { ToastOptions } from 'react-hot-toast'

export const usePopup = (message: string, type?: string, props?: ToastOptions) => {
  const defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top-right'
  }
  return type
    ? toast[type](message, { ...defaultOptions, ...props })
    : toast(message, { ...defaultOptions, ...props })
}
