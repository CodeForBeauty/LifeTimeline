import {
  createSlice,
  type Dispatch,
  type PayloadAction,
} from "@reduxjs/toolkit"

import { type EventData } from "../services/events"

import events from "../services/events"

const initialState: EventData[] = []

const eventsReducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(_state, action: PayloadAction<EventData[]>) {
      return action.payload
    },
    pushEvent(state, action: PayloadAction<EventData>) {
      state.push(action.payload)
    },
    delEvent(state, action: PayloadAction<EventData>) {
      return state.filter((event) => event.id !== action.payload.id)
    },
  },
})

export default eventsReducer.reducer

export const { setEvents, pushEvent, delEvent } = eventsReducer.actions

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    const data = await events.getAll()

    if (data == null) {
      return
    }

    dispatch(setEvents(data))
  }
}

export const addEvent = (event: EventData) => {
  return async (dispatch: Dispatch) => {
    const success = await events.addEvent(event)

    if (success) {
      dispatch(pushEvent(event))
    }
  }
}

export const removeEvent = (event: EventData) => {
  return async (dispatch: Dispatch) => {
    const success = await events.removeEvent(event)

    if (success) {
      dispatch(delEvent(event))
    }
  }
}
