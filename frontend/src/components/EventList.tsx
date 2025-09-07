import { useEffect } from "react"

import { useAppSelector, useAppDispatch } from "../reducers/hooks"

import { getEvents } from "../reducers/eventsReducer"

import Event from "./Event"

const EventList = () => {
  const dispatch = useAppDispatch()

  const events = useAppSelector((state) => state.events)

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <div>
      {events.map((event, index) => (
        <Event data={event} key={index} isLeft={index % 2 === 0} />
      ))}
    </div>
  )
}

export default EventList
