'use client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Forms } from '@/constants/forms'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  company: string
  interest: string
  message: string
}

interface FormStatus {
  state: 'idle' | 'submitting' | 'success' | 'error'
}

export const ConnectionForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({ state: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: '', email: '', company: '', interest: '', message: '' },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setFormStatus({ state: 'submitting' })

    const submissionData = Object.entries(data).map(([field, value]) => ({ field, value }))

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: Forms.connection, submissionData }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Form submission failed')
      }

      toast.success("Thank you for your message! We'll get back to you soon.", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      reset()
      setFormStatus({ state: 'success' })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )

      setFormStatus({ state: 'error' })
    }
  }

  return (
    <div className="bg-black bg-opacity-70 rounded-2xl p-4 md:p-6 w-full">
      <form className="flex flex-col gap-3 md:gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
          <div className="flex-1 w-full">
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Your name*"
              className="px-3 md:px-4 py-2 rounded w-full text-black"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="flex-1 w-full">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Your email*"
              className="px-3 md:px-4 py-2 rounded w-full text-black"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
          <div className="flex-1 w-full">
            <input
              {...register('company')}
              type="text"
              placeholder="Company name"
              className="px-3 md:px-4 py-2 rounded w-full text-black"
            />
          </div>

          <div className="flex-1 w-full">
            <input
              {...register('interest')}
              type="text"
              placeholder="I'm interested in"
              className="px-3 md:px-4 py-2 rounded w-full text-black"
            />
          </div>
        </div>

        <div>
          <textarea
            {...register('message', { required: 'Message is required' })}
            placeholder="Your message..."
            className="px-3 md:px-4 py-2 rounded h-24 md:h-32 w-full text-black"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white px-4 md:px-6 py-2 rounded self-start hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting || formStatus.state === 'submitting'}
        >
          {formStatus.state === 'submitting' ? 'Sending...' : 'Send'}
        </button>
      </form>

      <ToastContainer />
    </div>
  )
}
