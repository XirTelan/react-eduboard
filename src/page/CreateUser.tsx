import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import * as Yup from 'yup'
import TextField from '../components/UI/TextField'
import DateField from '../components/UI/DateField'

export default function CreateUser() {
  return (
    <>
      <h1>Create user form</h1>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(value) => {
          console.log(value)
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('This field is required'),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="name" displayName="Name" />
            <DateField field="date" displayName="Date" />
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>
            <Link className="btn btn-secondary m-1" to="/users">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}
