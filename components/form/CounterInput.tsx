'use client'
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react';
import { useState } from "react"

interface CounterProps {
  title: string
  valueKey: string
  defaultValue?: number
}



function CounterInput(props: CounterProps) {
  const { title, valueKey, defaultValue } = props
  const [count, setCount] = useState(defaultValue || 0)

  const handleCountChange = (event: React.MouseEvent<HTMLButtonElement>, action: 'plus' | 'minus') => {
    event.preventDefault();
    setCount(prev => (action === 'minus' ? Math.max(0, prev - 1) : prev + 1));
  }  

  return (
    <div className="w-full rounded-lg border-2 border-solid border-color:oklch(0.705 0.015 286.067) py-4 px-6 flex justify-between items-center">
      {/* hidden input */}
      <input type='hidden' name={valueKey} value={count} />
      <div className="flex flex-col">
        <h3 className="font-medium capitalize">{title}</h3>
        <span className="text-gray-400 text-sm">請輸入{title}數</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant='outline' size='icon' onClick={(e) => handleCountChange(e,'minus')}>
          <Minus />
        </Button>
        <strong>
          {count}
        </strong>
        <Button variant='outline' size='icon' onClick={(e) => handleCountChange(e,'plus')}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export default CounterInput