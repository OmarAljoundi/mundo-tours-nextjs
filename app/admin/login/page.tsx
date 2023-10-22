'use client'
import { http } from '@/service/httpService'
import { Response, User } from '@/types/custom'
import { UserSchema } from '@/types/validations'
import { Button, Input } from '@nextui-org/react'
import { useFormik, FormikHelpers } from 'formik'
import { EyeOff, Eye } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const route = useRouter()
  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    document.getElementsByTagName('html')[0].lang = 'en'
    document.getElementsByTagName('html')[0].dir = 'ltr'
  }, [])

  const handleSubmitLogin = async ({ email, password }: User) => {
    setSubmitting(true)
    const response = http<Response<any>>(`/api/auth/login?email=${email}&password=${password}`, { revalidate: 0 }).get()

    toast.promise(response, {
      error() {
        return 'Invalid credentials.'
      },
      loading: 'Login in...',
      success(data) {
        route.push('/admin/dashboard')
        return data.message
      },
      finally() {
        setSubmitting(false)
      },
    })
  }

  const { values, touched, errors, handleBlur, handleChange, handleReset, handleSubmit, isValid } = useFormik({
    initialValues: {},
    onSubmit: handleSubmitLogin,
    validationSchema: UserSchema,
    validateOnBlur: true,
    validateOnChange: true,
  })

  return (
    <div className="max-w-2xl mx-auto pt-72">
      <div className=" rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-center">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="email"
              placeholder="m@example.com"
              label="Email"
              labelPlacement="outside"
              required
              type="email"
              isClearable
              isInvalid={!!errors.email && touched.email}
              errorMessage={!!errors.email && touched.email && errors.email}
              variant="bordered"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Password"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Enter your password"
              isInvalid={!!errors.password && touched.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={!!errors.password && touched.password && errors.password}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
            />
            <Button
              className="w-full font-bold text-white disabled:opacity-50"
              color="primary"
              variant="shadow"
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
