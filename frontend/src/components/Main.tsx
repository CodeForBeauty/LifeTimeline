import EventList from "./EventList"
import CreateForm from "./CreateForm"
import LoginForm from "./LoginForm"

import { useState, useEffect } from "react"

import { type EventData } from "../services/events"
import loginService, { type LoginData } from "../services/login"

import { useAppDispatch, useAppSelector } from "../reducers/hooks"
import { addEvent, getEvents } from "../reducers/eventsReducer"
import { setToken } from "../reducers/tokenReducer"

import { motion } from "motion/react"

const Main = () => {
  const dispatch = useAppDispatch()
  const [isForm, setIsForm] = useState(false)

  const [isLogin, setIsLogin] = useState(true)
  const [loginError, setLoginError] = useState("")

  const token = useAppSelector((state) => state.token)

  const handleCreate = (data: EventData) => {
    dispatch(addEvent(data))
    setIsForm(false)
  }

  useEffect(() => {
    const loaded = localStorage.getItem("token")
    if (loaded !== null) {
      dispatch(setToken(loaded))
    }

    dispatch(getEvents())
  }, [dispatch])

  const handleLogin = async (data: LoginData) => {
    const res = await loginService.login(data)

    if (res !== null) {
      dispatch(setToken(res))
      localStorage.setItem("token", res)
    }
    else {
      setLoginError("Incorrect username or password")
    }
  }

  const handleReg = async (data: LoginData) => {
    const res = await loginService.register(data)

    if (res !== null) {
      dispatch(setToken(res))
      localStorage.setItem("token", res)
    }
    else {
      setLoginError("Username is taken")
    }
  }

  return (
    <div className="flex pt-5 justify-center h-fit">
      {token == "" ? (
        <div className="flex flex-col">
          <button
          className="justify-self-center self-center z-10 bg-yellow-100 hover:bg-yellow-200 p-2 m-4 text-md rounded-md border-2 border-yellow-300 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin)
            }}
          >
            {isLogin ? "register" : "login"}
          </button>
          <LoginForm
            submitLabel={isLogin ? "login" : "register"}
            onSubmit={isLogin ? handleLogin : handleReg}
            error={loginError}
          />
        </div>
      ) : isForm ? (
        <CreateForm onSubmit={handleCreate} />
      ) : (
        <EventList />
      )}
      <div className="absolute bottom-0 top-0 w-3 bg-gray-100 shadow-xl shadow-blue-950"></div>
      <motion.button
        onClick={() => setIsForm(!isForm)}
        className="absolute bottom-5 rounded-4xl bg-gray-50 hover:bg-gray-100 p-3 cursor-pointer z-50 shadow-2xs text-xl border-[1px]"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        {isForm ? "Close" : "Create"}
      </motion.button>
    </div>
  )
}

export default Main
