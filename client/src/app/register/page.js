'use client'
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup) //extendyup
import FormSection from '@/components/formSection/page';
import {Input} from "@nextui-org/react";
import {Button} from '@nextui-org/react';
import Link from 'next/link';

//For password input
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().password('Do better').required('Password required'),
});

const Register = () => {
    const [isVisible,setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
  <FormSection>
    <Formik
      initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
            // same shape as initial values
            console.log(values);
        }}
        >
      {({ errors, touched }) => (
          <Form>
            <h1 className='mb-4'>Create a new account: </h1>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                {/* <Input type="usename" label="Username" /> */}
                <Input type="usename" label="Usename" placeholder="Enter your username" className='mb-4'/>
            </div>
            {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}

            <Input
            isClearable
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            className='mb-4'
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          
            <Input
            label="Password"
            variant="bordered"
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
            className="max-w-xs mb-4"
            />
          {errors.password && touched.email ? <div>{errors.email}</div>: null}

          <Button is={Link} color="success" href="/">Submit</Button>
        </Form>
      )}
    </Formik>
  </FormSection>
)};

export default Register;