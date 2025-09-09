import EventList from "./EventList"
import CreateForm from "./CreateForm"

import { useState, useEffect } from "react"

import { type EventData } from "../services/events"

import { useAppDispatch } from "../reducers/hooks"
import { addEvent, getEvents } from "../reducers/eventsReducer"

import { motion } from "motion/react"

const Main = () => {
  const dispatch = useAppDispatch()
  const [isForm, setIsForm] = useState(false)

  const handleCreate = (data: EventData) => {
    dispatch(addEvent(data))
    setIsForm(false)
  }

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <div className="flex pt-5 justify-center h-fit">
      {isForm ? <CreateForm onSubmit={handleCreate} /> : <EventList />}
      <div className="absolute bottom-0 top-0 w-3 bg-gray-100 shadow-xl shadow-blue-950"></div>
      <motion.button
        onClick={() => setIsForm(!isForm)}
        className="absolute bottom-5 rounded-4xl bg-gray-50 hover:bg-gray-100 p-3 cursor-pointer"
        initial={{scale: 1}}
        whileHover={{scale: 1.1}}
      >
        {isForm ? "Close" : "Create"}
      </motion.button>
    </div>
  )
}

export default Main
