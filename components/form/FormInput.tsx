"use client"

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type FormInputProps = {
  name: string
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}

function FormInput(props: FormInputProps) {
  const { name, type, label, defaultValue = '', placeholder, disabled, maxLength } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className='mb-2'>
      <Label htmlFor={name}>{label || name}</Label>
      <div className='flex flex-col'>
        <Input 
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          disabled={disabled}
          required
          className="flex-grow"
        />
        {maxLength && (
          <p className={`text-sm mt-1 text-right`} style={{ fontSize: '12px' }}>
            {value.length} / {maxLength}
          </p>
        )}
      </div>
    </div>
  )
}

export default FormInput
