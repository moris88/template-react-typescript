import React from 'react'
import { useNavigate } from 'react-router-dom'
import { requestAtom } from '../utils/atoms'
import { useAtom } from 'jotai'
import Form from './Form'

function Home() {
  const navigate = useNavigate()
  const [request, setRequest] = useAtom(requestAtom)
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-auto">
      <p className="text-center font-bold">{'HOME PAGE'}</p>
      <Form
        request={request}
        onChange={(e) => {
          setRequest(e)
          navigate('/view')
        }}
      />
    </div>
  )
}

export default Home
