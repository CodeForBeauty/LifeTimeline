import axios from "axios"

export const EventTypes = {
  CHILDHOOD: 0,
  EDUCATION: 1,
  WORK: 2,
  HOBBY: 3,
  FAMILY: 4,
}

export type EventData = {
  id: number
  name: string
  description: string
  type: number
  date: string
}

const getAll = async (): Promise<EventData[] | null> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
    const response = await axios.get("api/events", config)

    return response.data
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

const addEvent = async (event: EventData): Promise<EventData | null> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
    const response = await axios.post("api/events", event, config)

    return response.data
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

const removeEvent = async (event: EventData): Promise<EventData | null> => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
    const response = await axios.post("api/events/delete", event, config)

    return response.data
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

export default { getAll, addEvent, removeEvent }
