import type { EventData } from "../services/events"

const Event = ({ data }: { data: EventData }) => {
  return <div>
    <div>{data.name}</div>
    <div>{data.description}</div>
    <div>{data.date.toDateString()}</div>
    <div>{data.type}</div>
  </div>
}

export default Event
