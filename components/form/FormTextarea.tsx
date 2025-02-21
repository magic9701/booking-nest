"use client"

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"

type FormTextareaProps = {
  name: string
  label?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  minLength?: number
  rows?: number
  required?: boolean
}

function FormTextarea(props: FormTextareaProps) {
  const { name, label, defaultValue = '', placeholder, disabled, maxLength, minLength, rows = 4, required = false } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className='mb-2'>
      <Label htmlFor={name}>{label || name}</Label>
      <div className='flex flex-col'>
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder + (minLength ? `  (最少輸入${minLength}字)` : '')}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          rows={rows}
          className="resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default FormTextarea
