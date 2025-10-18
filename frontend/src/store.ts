import { configureStore } from "@reduxjs/toolkit"

import eventsReducer from "./reducers/eventsReducer"
import tokenReducer from "./reducers/tokenReducer"

const store = configureStore({
  reducer: {
    events: eventsReducer,
    token: tokenReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
