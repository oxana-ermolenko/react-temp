import React from 'react';
import moment from 'moment';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../../../actions/user_actions';
import {useDispatch} from 'react-redux';
import {Form, Input, Button} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function RegisterPage(props) {
  const dispatch = useDispatch();

  return(
    <Formik
      initialValues = {{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''

      }}
      validationSchema = {Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        lastName: Yup.string()
          .required('Last name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 cherecters')
          .required('Password is required')
      })}
      onSubmit = {(value, {setSumitting}) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: value.email,
            password: value.password,
            name: value.name,
            lastName: value.lastName,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=indenticon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push('/login')
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSumitting(false);
        }, 500)
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return(
          <div className = 'app'>
            <h2>Sign up</h2>
            <Form 
              style = {{
                minWidth: '375px'
              }}
              {...formItemLayout}
              onSubmit = {handleSubmit}
            >

              <Form.Item required label = 'Name'>
                <input
                  id = 'name'
                  placeholder = 'Enter your name'
                  type = 'text'
                  value = {values.name}
                  onChange = {handleChange}
                  onBlur = {handleBlur}
                  className = {
                    errors.name && touched.name 
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
              </Form.Item>

              <Form.Item required label = 'Last Name'>
                <Input
                  id = 'lastName'
                  placeholder = 'Enter your Last Name'
                  type = 'text'
                  value = {values.lastName}
                  onChange = {handleChange}
                  onBlur = {handleBlur}
                  className = {
                    errors.lastName && touched.lastName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className = 'input-feedback'>
                    {errors.lastName}
                  </div>
                )}
              </Form.Item>

              <Form.Item required label = 'Email' hasFeedback 
                validateStatus = {errors.email && touched.email ? 'error' : 'success'}>
                  <Input
                    id='email'
                    placeholder = 'Enter your Email'
                    type = 'email'
                    value = {values.email}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    className = {
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className = 'input-feedback'>
                      {errors.email}
                    </div>
                  )}
                </Form.Item>

                <Form.Item required label = "Password" hasFeedback 
                  validateStatus = {
                    errors.password && touched.password ? 'error' : 'success'
                  }>
                    <Input
                      id = 'password'
                      placeholder = 'Enter your password'
                      type = 'password'
                      value = {values.password}
                      onChange = {handleChange}
                      onBlur = {handleBlur}
                      className = {
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                    />
                  </Form.Item>

                  <Form.Item required label = 'Confirm' hasFeedback>
                    <Input
                      id = 'confirmPassword'
                      placeholder = 'Enter your confirmPassword'
                      type = 'password'
                      value = {values.confirmPassword}
                      onChange = {handleChange}
                      onBlur = {handleBlur}
                      className = {
                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className = 'input feedback'>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item 
                    {...tailFormItemLayout}
                  >
                    <Button
                      onClick = {handleSubmit}
                      type = 'primary'
                      disabled = {isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form.Item>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default RegisterPage;