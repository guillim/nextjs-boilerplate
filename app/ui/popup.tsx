'use client'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export default function Popup(
  {msg, hideIcon = false, title, btnText, btnCloseText = 'Close', className = ''}:
  {msg: string, hideIcon?: boolean, title: string, btnText: string , btnCloseText?: string, className?: string}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span className={"max-w-2xl margin-auto text-gray-500 text-sm "+className}
        onClick={() => setIsOpen(true)}
      >
        <span className='flex items-center'>
          {!hideIcon &&
            <InformationCircleIcon className={"h-4 w-4 text-gray-500 mr-1"} />
          }
          {btnText}
        </span>
      </span>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}
            </DialogTitle>
            <Description>{msg}</Description>
            <div className="flex gap-4">
              <Button onClick={() => setIsOpen(false)}>{btnCloseText}</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}