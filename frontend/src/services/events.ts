export const EventTypes = {
  CHILDHOOD: 0,
  EDUCATION: 1,
  WORK: 2,
  HOBBY: 3,
  FAMILY: 4,
}

export type EventData = {
  name: string
  description: string
  type: number
  date: string
}

const events: EventData[] = [
  {
    name: "Finished School",
    description: "Finished some school",
    type: EventTypes.EDUCATION,
    date: "05/25/2021",
  },
  {
    name: "Started working",
    description: "Started work at some company",
    type: EventTypes.WORK,
    date: "08/30/2021",
  },
  {
    name: "Started working",
    description: "Started work at some company",
    type: EventTypes.CHILDHOOD,
    date: "08/30/2021",
  },
  {
    name: "Started working",
    description: "Started work at some company",
    type: EventTypes.HOBBY,
    date: "08/30/2021",
  },
  {
    name: "Started working",
    description: "Started work at some company",
    type: EventTypes.FAMILY,
    date: "08/30/2021",
  },
]

const getAll = async (): Promise<EventData[] | null> => {
  return events
}

const addEvent = async (event: EventData): Promise<boolean> => {
  events.push(event)

  return true
}

export default { getAll, addEvent }
