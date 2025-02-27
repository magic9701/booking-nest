import { Label } from '../ui/label'
import { Input } from '../ui/input'

type FormInputNumberProps = {
  defaultValue?: number
  label: string
  name: string
  placeholder: string
  min?: number
  max?: number
  required?: boolean
  className?: string
}

function NumberInput(props : FormInputNumberProps) {
  const { defaultValue, label, name, placeholder, min, max, required, className } = props
  return (
    <div className={`mb-2 ${className}`}>
      <Label htmlFor={name} className="">
        {label}
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={min}
        max={max}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
export default NumberInput