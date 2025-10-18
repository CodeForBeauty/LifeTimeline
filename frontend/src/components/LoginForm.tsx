import InputField from "./InputField"

import { useFormik } from "formik"
import * as yup from "yup"

import { type LoginData } from "../services/login"

import { motion } from "motion/react"

const initialValues: LoginData = {
  username: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must at least be 5 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must at least be 6 characters long"),
})

const LoginForm = ({
  onSubmit,
  submitLabel,
  error,
}: {
  onSubmit: (values: LoginData) => void
  submitLabel: string
  error?: string
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <motion.form className="flex flex-col z-10 bg-gradient-to-b from-blue-100 to-gray-200 p-8 rounded-xl border-[1px] border-blue-200">
      {formik.touched.username && formik.errors.username && (
        <p className="text-red-800">{formik.errors.username}</p>
      )}
      <InputField
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange("username")}
        type="text"
      />

      {formik.touched.password && formik.errors.password && (
        <p className="text-red-800">{formik.errors.password}</p>
      )}
      <InputField
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        type="password"
      />

      {error && <p className="text-red-800">{error}</p>}

      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault()
          formik.submitForm()
        }}
        className="justify-self-center self-center bg-yellow-400 hover:bg-yellow-500 p-2 m-4 text-2xl rounded-md border-2 border-yellow-600 cursor-pointer"
      >
        {submitLabel}
      </button>
    </motion.form>
  )
}

export default LoginForm
