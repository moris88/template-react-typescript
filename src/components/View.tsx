import React from 'react'
import { Button, Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useAtom, useAtomValue } from 'jotai'
import { requestAtom, responseAtom } from '../utils/atoms'
import { useFetch, useUpdateEffect } from 'usehooks-ts'

function View() {
  const navigate = useNavigate()
  const [response, setResponse] = useAtom(responseAtom)
  const request = useAtomValue(requestAtom)
  console.log(request)
  const { data, error } = useFetch<any>(request?.url, {
    method: request?.method,
    body: request?.body,
    headers: request?.headers
      ? {
          ...JSON.parse(request?.headers ?? '{}'),
        }
      : undefined,
  })

  useUpdateEffect(() => {
    console.count('useUpdateEffect')
    console.log('data', data)
    if (data) {
      setResponse(JSON.stringify(data, null, 3))
    }
  }, [data])

  if (error) return <p>{error.message}</p>
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <p className="text-center font-bold">{'VIEW PAGE'}</p>
      <div className="h-screen w-full overflow-auto">
        <pre>{response ?? '--NONE--'}</pre>
      </div>
      <Button onClick={() => navigate('/')}>Home</Button>
    </div>
  )
}

export default View
