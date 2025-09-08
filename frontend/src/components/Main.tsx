import EventList from "./EventList"

const Main = () => {
  return <div className="flex pt-5 justify-center h-fit">
    <EventList/>
    <div className="absolute bottom-0 top-0 w-3 bg-gray-100 shadow-xl shadow-blue-950"></div>
  </div>
}

export default Main
