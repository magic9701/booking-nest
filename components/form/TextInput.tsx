"use client"

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type TextInputProps = {
  name: string
  label?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  className?: string
  readOnly?: boolean
}

function TextInput(props: TextInputProps) {
  const { name, label, defaultValue = '', placeholder, disabled, maxLength, className, readOnly } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={`mb-2 ${className}`}>
      <Label htmlFor={name}>{label || name}</Label>
      <div className='flex flex-col'>
        <Input 
          id={name}
          name={name}
          type='text'
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          disabled={disabled}
          required
          className="flex-grow"
          readOnly={readOnly}
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

export default TextInput
