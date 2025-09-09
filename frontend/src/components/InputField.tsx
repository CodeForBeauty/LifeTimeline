import type { ChangeEventHandler } from "react"

const InputField = ({
  label,
  value,
  onChange,
  type,
  id,
}: {
  label: string
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  type: string
  id?: string
}) => {
  return (
    <div className="flex flex-col text-xl">
      <label htmlFor={id} className="pl-2 text-gray-800">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        className="bg-blue-50 p-1 rounded-xs border-2 border-blue-200"
      />
    </div>
  )
}

export default InputField
