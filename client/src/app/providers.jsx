'use client'
import {NextUIProvider} from '@nextui-org/react'
import toast, {Toaster} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function Providers({children}) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <Toaster/>
      {children}
    </NextUIProvider>
  )
}