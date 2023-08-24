import { atom } from 'jotai'

export const responseAtom = atom<string | undefined>(undefined)
export const requestAtom = atom<
  | {
      url: string
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: string
      headers?: string
    }
  | undefined
>(undefined)
