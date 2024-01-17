'use client'
import React, {useState} from 'react';
// import { useRouter } from 'next/router';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup) //extendyup
import FormSection from '@/components/formSection/page';
import {Input} from "@nextui-org/react";
import {Button} from '@nextui-org/react';
import Link from 'next/link';
import Navbar from '../../components/navbar/page';

//For password input
import { EyeFilledIcon } from '../register/EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string().password('Do better').required('Password required'),
});

const Register = () => {
  const [isVisible,setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleRegister = async (inputFields) => {
      // console.log(inputFields);
      const response = await fetch('http://localhost:4000/register',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(inputFields)
      });
      if(!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
      return response.json();
    }
    
    const onSubmit=async (values) => {
      // const router = useRouter();
      // console.log(values);
      const response = await handleRegister(values);
      if(response) {
        console.log("hello")
        // router.push('/')
      }
    }
    return (
      <>
      <Navbar hideLogin={true}/>
  <FormSection>
    <Formik
      initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={SignupSchema}

        onSubmit={onSubmit}
        >
      {({ errors, touched,handleChange }) => (
          <Form>
            <h1 className='mb-4 font-bold'>Login: </h1>
            <Input
              type="username"
              label="Username"
              name="username"
              variant="bordered"
              placeholder="MonkeyFace101"
              className="max-w-xs mt-4"
              onChange={handleChange}
            />
            {errors.username && touched.username ? (<div className="ml-4">{errors.username}</div>) : null}

            <Input
            label="Password"
            variant="bordered"
            name="password"
            placeholder="Enter your password"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs mt-4"
            onChange={handleChange}
            />
          {errors.password && touched.password ? <div>{errors.password}</div>: null}

          <Button type="submit" name="submit" color="success" className="mt-4">Login</Button>
        </Form>
      )}
    </Formik>
  </FormSection>
  </>
)};

export default Register;