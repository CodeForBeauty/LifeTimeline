import { type EventData, EventTypes } from "../services/events"

import { motion } from "motion/react"

const Event = ({
  data,
  isLeft,
  onRemove,
}: {
  data: EventData
  isLeft: boolean
  onRemove: () => void
}) => {
  let image = "/work.svg"

  switch (Number(data.type)) {
    case EventTypes.CHILDHOOD:
      image = "/childhood.svg"
      break
    case EventTypes.EDUCATION:
      image = "/education.svg"
      break
    case EventTypes.FAMILY:
      image = "/family.svg"
      break
    case EventTypes.HOBBY:
      image = "/hobby.svg"
      break
    case EventTypes.WORK:
      image = "/work.svg"
      break
  }

  return (
    <div
      className={
        (isLeft ? "items-start " : "items-end ") +
        "flex flex-col w-sm sm:w-xl h-auto m-12 mb-96"
      }
    >
      <motion.div
        className="flex flex-col border-2 border-gray-300 rounded-2xl p-4 bg-white h-auto min-h-64 sm:min-h-80 w-40 sm:w-3xs text-2xl shadow-xl"
        initial={{ scale: 0, x: isLeft ? 200 : -200 }}
        whileInView={{ scale: 1, x: 0, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.05, x: isLeft ? 10 : -10 }}
      >
        <img src={image} alt="event type" width={80} />
        <h2 className="text-3xl font-medium">{data.name}</h2>
        <p className=" text-[1.2rem] font-medium">{data.date}</p>
        <p className="text-">{data.description}</p>

        <button
          onClick={onRemove}
          className="self-end mt-6 mr-2 p-1 text-xl cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md border-2 border-gray-400/50 shadow-md"
        >
          delete
        </button>
      </motion.div>

      <div className="rounded-4xl bg-blue-100 w-5 h-5 self-center z-10 shadow-xl shadow-black inset-shadow-sm inset-shadow-blue-300" />
    </div>
  )
}

export default Event
