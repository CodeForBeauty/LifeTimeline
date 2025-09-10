import { useAppSelector, useAppDispatch } from "../reducers/hooks"

import { removeEvent } from "../reducers/eventsReducer"

import type { EventData } from "../services/events"

import Event from "./Event"

const EventList = () => {
  const dispatch = useAppDispatch()

  const events = useAppSelector((state) => state.events)

  const handleRemove = (event: EventData) => {
    return () => {
      dispatch(removeEvent(event))
    }
  }

  return (
    <div>
      {events.map((event, index) => (
        <Event
          data={event}
          key={index}
          isLeft={index % 2 === 0}
          onRemove={handleRemove(event)}
        />
      ))}
    </div>
  )
}

export default EventList
