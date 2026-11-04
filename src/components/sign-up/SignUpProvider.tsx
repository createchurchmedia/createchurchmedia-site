'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { SignUpModal } from '@/components/sign-up/SignUpModal'

type SignUpContextValue = {
  /** Open the shared sign-up modal, tagging which CTA the lead came from. */
  openSignUpModal: (source: string) => void
}

const SignUpContext = createContext<SignUpContextValue | null>(null)

export function useSignUp(): SignUpContextValue {
  const ctx = useContext(SignUpContext)
  if (!ctx) {
    throw new Error('useSignUp must be used inside <SignUpProvider>')
  }
  return ctx
}

/**
 * App-wide host for the single sign-up modal. Every `<SignUpButton>`
 * calls `openSignUpModal(source)` to open it; the `source` string is carried
 * into the submission payload so signups are attributed to the exact CTA that
 * was clicked (header, footer, a specific case study, etc.). Wrapped around the
 * whole tree in the root layout so the modal lives once and is reachable from
 * anywhere.
 */
export function SignUpProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<string | null>(null)

  const openSignUpModal = useCallback((nextSource: string) => {
    setSource(nextSource)
  }, [])

  const close = useCallback(() => setSource(null), [])

  return (
    <SignUpContext.Provider value={{ openSignUpModal }}>
      {children}
      <SignUpModal source={source} onClose={close} />
    </SignUpContext.Provider>
  )
}
