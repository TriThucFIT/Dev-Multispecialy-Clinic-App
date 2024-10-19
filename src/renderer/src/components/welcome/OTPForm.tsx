import OTP from 'antd/es/input/OTP'
import { FC, useEffect, useState, useTransition } from 'react'
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export const OTPForm: FC = () => {
  console.log(firebaseConfig)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [isPeding, startTransaction] = useTransition()

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha resolved with response:', response)
      }
    })
    setRecaptchaVerifier(recaptchaVerifier)
    return () => {
      recaptchaVerifier.clear()
    }
  }, [auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransaction(() => {
      if (!recaptchaVerifier) {
        return
      }
      if (!recaptchaVerifier) {
        return
      }
      try {
        const phone_formatted = phone[0] === '0' ? phone.replace('0', '+84') : phone
        signInWithPhoneNumber(auth, phone_formatted, recaptchaVerifier).then((result) => {
          setConfirmationResult(result)
        })
        console.log(confirmationResult)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <>
      <div className="w-full flex justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 lg:h-[400px] bg-white bg-opacity-90 rounded-lg p-5"
        >
          {confirmationResult ? (
            <div className="flex flex-col lg:mt-10 mt-5">
              <label className="text-lg font-semibold text-[#299ec4]">OTP</label>
              <OTP inputMode="numeric" length={6} onChange={(value) => setOtp(value)} value={otp} />
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#299ec4]">Nhập số điện thoại</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                required
                className="border-2 border-[#299ec4] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full border border-[#299ec4] hover:text-white text-[#299ec4] font-semibold rounded-lg p-2 lg:mt-10 mt-5 hover:bg-[#299ec4] focus:outline-none focus:ring-2 focus:ring-[#299ec4] focus:border-transparent"
          >
            {!confirmationResult ? 'Gửi OTP' : 'Xác nhận'}
          </button>
        </form>
      </div>
      <div id="recaptcha-container " />
    </>
  )
}
