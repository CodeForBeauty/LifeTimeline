import { useAppSelector } from "../reducers/hooks"

import Event from "./Event"

const EventList = () => {
  const events = useAppSelector((state) => state.events)

  return (
    <div>
      {events.map((event, index) => (
        <Event data={event} key={index} isLeft={index % 2 === 0} />
      ))}
    </div>
  )
}

export default EventList
