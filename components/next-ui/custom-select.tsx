'use client'
import { Select, SelectProps, Selection } from '@nextui-org/react'
import { FunctionComponent, useEffect, useState } from 'react'

interface CustomSelectProps {}

const CustomSelect: FunctionComponent<SelectProps & CustomSelectProps> = ({ ...restProps }) => {
  const [values, setValues] = useState<Selection>(new Set([]))

  useEffect(() => {
    if (restProps.value) {
      setValues(new Set([String(restProps.value)]))
    }
  }, [])

  return (
    <Select {...restProps} selectedKeys={values} onSelectionChange={setValues}>
      {restProps.children}
    </Select>
  )
}

export default CustomSelect
