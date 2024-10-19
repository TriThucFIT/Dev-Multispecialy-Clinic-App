import toast, { ToastOptions } from 'react-hot-toast'

export const usePopup = (message: string, type?: string, props?: ToastOptions) => {
  const defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top-right',
    icon: type === 'error' ? '❌' : '✅',
    className: type === 'error' ? 'border border-red-300' : 'border border-green-300'
  }
  return type && toast[type]
    ? toast[type](message, { ...defaultOptions, ...props })
    : toast.success(message, { ...defaultOptions, ...props })
}
