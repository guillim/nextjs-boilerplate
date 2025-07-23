'use client'

import { useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

type ToastProps = {
  message?: string;
  type?: 'success' | 'error' | 'info';
  showToast?: boolean;
}

export default function Toast({ message, type, showToast }: ToastProps) {
  useEffect(() => {
    if (message && showToast) {
      if (type === 'success') toast.success(message);
      else if (type === 'error') toast.error(message);
      else toast(message);
    }
  }, [message, type]);

  return <Toaster />;
}