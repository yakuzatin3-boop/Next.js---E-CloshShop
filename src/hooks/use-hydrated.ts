'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/** True only after the component has mounted on the client. */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}