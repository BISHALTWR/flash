'use client'
import {NextUIProvider} from '@nextui-org/react'
import toast, {Toaster} from 'react-hot-toast';

export function Providers({children}) {
  return (
    <NextUIProvider>
      <Toaster/>
      {children}
    </NextUIProvider>
  )
}