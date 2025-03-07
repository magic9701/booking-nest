'use client'

import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { actionFunction } from '@/utils/types'

const initState = {
  message: ''
}

function FormContainer({action, children}: {action: actionFunction, children: React.ReactNode}) {
  const [state, formAction] = useFormState(action, initState)
  const {toast} = useToast()

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  
  return (
    <form action={formAction}>{children}</form>
  )
}

export default FormContainer