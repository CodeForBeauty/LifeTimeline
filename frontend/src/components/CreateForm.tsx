import InputField from "./InputField"

import { useFormik } from "formik"
import * as yup from "yup"

import { type EventData, EventTypes } from "../services/events"

import { motion } from "motion/react"

const initialValues: EventData = {
  name: "",
  description: "",
  type: 0,
  date: new Date().toLocaleDateString("en-CA"),
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  description: yup.string().optional(),
  type: yup.number().required("Event type is required"),
  date: yup.date().required("Event date is required"),
})

const eventTypes = [
  {
    type: EventTypes.CHILDHOOD,
    image: "/childhood.svg",
    name: "Childhood",
  },
  {
    type: EventTypes.EDUCATION,
    image: "/education.svg",
    name: "Education",
  },
  {
    type: EventTypes.FAMILY,
    image: "/family.svg",
    name: "Family",
  },
  {
    type: EventTypes.HOBBY,
    image: "/hobby.svg",
    name: "Hobby",
  },
  {
    type: EventTypes.WORK,
    image: "/work.svg",
    name: "Work",
  },
]

const CreateForm = ({
  onSubmit,
}: {
  onSubmit: (values: EventData) => void
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <motion.form
      className="flex flex-col z-10 bg-gradient-to-b from-blue-100 to-gray-200 p-8 rounded-xl border-[1px] border-blue-200"
      initial={{ scale: 0, y: -150 }}
      whileInView={{ scale: 1, y: 0 }}
    >
      {formik.touched.name && formik.errors.name && (
        <p className="text-red-800">{formik.errors.name}</p>
      )}
      <InputField
        label="Event"
        value={formik.values.name}
        onChange={formik.handleChange("name")}
        type="text"
        id="name"
      />
      <InputField
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange("description")}
        type="text"
        id="description"
      />
      <InputField
        label="Date"
        value={formik.values.date}
        onChange={formik.handleChange("date")}
        type="date"
        id="date"
      />

      <div className="flex flex-row">
        {eventTypes.map((type) => (
          <div
            key={type.type}
            className="flex flex-col justify-end items-center m-2"
            onClick={() => formik.handleChange("type")(type.type.toString())}
          >
            <img src={type.image} alt={type.name} width={64} className="m-3" />
            <input
              type="radio"
              value={type.name}
              checked={formik.values.type == type.type}
              name={type.name}
              readOnly
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault()
          formik.submitForm()
        }}
        className="justify-self-center self-center bg-yellow-400 hover:bg-yellow-500 p-2 m-4 text-2xl rounded-md border-2 border-yellow-600 cursor-pointer"
      >
        Create
      </button>
    </motion.form>
  )
}

export default CreateForm
