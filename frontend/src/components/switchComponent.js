import React from 'react'
import Form from 'react-bootstrap/Form';

const switchComponent = () => {
  return (
    <Form>
    <Form.Check // prettier-ignore
      type="switch"
      id="custom-switch"
      label="Check this switch"
    />
    <Form.Check // prettier-ignore
      disabled
      type="switch"
      label="disabled switch"
      id="disabled-custom-switch"
    />
  </Form>
  )
}

export default switchComponent