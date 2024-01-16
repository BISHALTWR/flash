'use client'
import React, {useState} from 'react';
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
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
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
      <>
      <Navbar register={false} login={true}/>
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
      {({ errors, touched,handleChange }) => (
          <Form>
            <h1 className='mb-4 font-bold'>Create a new account: </h1>
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
            isClearable
            type="email"
            label="Email"
            name="email"
            variant='bordered'
            placeholder="you@example.com"
            labelPlacement="inside"
            className='mt-4'
            onChange={handleChange}
            />
            {console.log(errors.email)}
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
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

          <Button type="submit" name="submit" is={Link} color="success" className="mt-4" href="/">Submit</Button>
        </Form>
      )}
    </Formik>
  </FormSection>
  </>
)};

export default Register;