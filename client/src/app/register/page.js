'use client'
import React, {useState} from 'react';
import { useRouter } from 'next/navigation'; //for app router
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup) //extendyup
import FormSection from '@/components/formSection/page';
import Navbar from '../../components/navbar/page';

//nextui
import {Input} from "@nextui-org/react";
import {Button} from '@nextui-org/react';

//hot-toast
import toast, {Toaster} from 'react-hot-toast';
const notify = (msg) => toast(msg);

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
  const router = useRouter();
  const [isVisible,setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleRegister = async (inputFields) => {
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(inputFields),
      });
      const data = await response.json();
      notify(data.msg + (response.status === 200 ? '✅' : '❌'));
      if (response.status === 200) {
        router.push('./login');
      }
    } catch (error) {
      console.error(error);
    }
  };
    
    const onSubmit=async (values) => {
      handleRegister(values);
    };
    return (
      <>
      <Navbar hideRegister={true}/>
  <FormSection>
    <Formik
      initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
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
            type="email"
            label="Email"
            name="email"
            variant='bordered'
            placeholder="you@example.com"
            labelPlacement="inside"
            className='mt-4'
            onChange={handleChange}
            />
            {/* {console.log(errors.email)} */}
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

          <Button type="submit" name="submit" color="success" className="mt-4 mx-auto">Submit</Button>
        </Form>
      )}
    </Formik>
  </FormSection>
  </>
)};

export default Register;