import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type FormInputProps = {
  name:string
  type:string
  label?:string
  defaultValue?:string
  placeholder?:string
  disabled?: boolean
}

function FormInput(props: FormInputProps) {
  const { name, type, label, defaultValue, placeholder, disabled } = props
  return (
    <div className='mb-2'>
      <Label htmlFor={name}>{label || name}</Label>
      <Input 
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        required
      />
    </div>
  )
}

export default FormInput