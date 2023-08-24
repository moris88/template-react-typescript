import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Request } from '../types/global'

interface FormProps {
  request?: Request
  onChange: (event: Request) => void
}
const Form = ({ request, onChange }: FormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: request,
  })
  const onSubmit = handleSubmit((data) => {
    onChange({
      url: data.url,
      method: data.method ?? 'GET',
      body: data.body === '' ? undefined : data.body,
      headers: data.headers === '' ? undefined : data.headers,
    })
  })

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 w-full"
      onSubmit={onSubmit}
    >
      {errors?.url && (
        <p className="text-red-800 font-bold text-center">
          {errors.url.message}
        </p>
      )}
      <div className="flex justify-center items-center gap-4 w-full">
        <TextInput
          {...register('url', {
            required: { value: true, message: 'URL is mandatory!' },
          })}
          className="w-1/2"
          type="text"
          placeholder="Enter URL"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <Label className="text-white w-1/12">METHOD:</Label>
        <Select className="w-4/12" {...register('method')}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </Select>
      </div>

      <div className="flex justify-center items-center w-full">
        <Label className="text-white w-1/12">BODY:</Label>
        <Textarea className="w-4/12" rows={5} {...register('body')}></Textarea>
      </div>
      <div className="flex justify-center items-center w-full">
        <Label className="text-white w-1/12">HEADERS:</Label>
        <Textarea
          className="w-4/12"
          rows={5}
          {...register('headers')}
        ></Textarea>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button color="failure" onClick={() => reset({ url: '' })}>
          Reset
        </Button>
        <Button type="submit">Fetch</Button>
      </div>
    </form>
  )
}

export default Form
