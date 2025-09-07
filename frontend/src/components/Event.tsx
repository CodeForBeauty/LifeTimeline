import type { EventData } from "../services/events"

import { motion } from "motion/react"

const Event = ({ data, isLeft }: { data: EventData; isLeft: boolean }) => {
  return (
    <div
      className={
        (isLeft ? "items-start " : "items-end ") +
        "flex flex-col w-2xl h-11/12 m-12"
      }
    >
      <motion.div
        className="border-2 rounded-2xl p-4 bg-white h-80 w-3xs text-2xl"
        initial={{ scale: 0, x: isLeft ? -200 : 200 }}
        whileInView={{ scale: 1, x: 0, transition: {duration: 0.3} }}
        whileHover={{scale: 1.1, x: 10}}
      >
        <div>{data.type}</div>
        <h2 className="text-3xl font-medium">{data.name}</h2>
        <div className=" text-[1.2rem] font-medium">{data.date}</div>
        <div>{data.description}</div>
      </motion.div>
    </div>
  )
}

export default Event
