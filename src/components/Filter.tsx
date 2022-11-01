import { Field, Form, Formik } from 'formik'
import { idText } from 'typescript'
import Button from './UI/Button'
interface groupDTO {
  id: number
  name: string
}
interface IFilterTimeline {
  isVisible?: boolean
}
interface FiterGroupForm {
  title: string
  groupId: number
}

export default function Filter({ isVisible }: IFilterTimeline) {
  const initialValue: FiterGroupForm = {
    title: '',
    groupId: 0,
  }
  const groups: groupDTO[] = [
    { id: 1, name: '001' },
    { id: 2, name: '002' },
  ]
  return (
    <>
      <div className="d-flex m-3">
        <div className="d-flex  gap-3  align-items-center"></div>

        <Formik         
          initialValues={initialValue}
          onSubmit={(value) => console.log(value)}
        >
          {(formikProps) => (
            <Form>
              <div className="row gx-3 ">
                <div className="col-auto d-flex gap-3 align-items-center">
                  <label className="mb-2 ">Курс</label>
                  <button className="btn btn-secondary">1</button>
                  <button className="btn btn-secondary">2</button>
                  <button className="btn btn-secondary">3</button>
                  <button className="btn btn-secondary">4</button>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps('groupId')}
                  >
                    <option value="0">--Choose a group---</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => formikProps.setValues(initialValue)}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isVisible && <div className="w-100">asd</div>}
    </>
  )
}
