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
import Navbar from '../../components/navbar/page';
import { useDispatch } from 'react-redux';
import {loginUser} from '@/redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation';

//For password input
import { EyeFilledIcon } from '../register/EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

//hot-toast
import toast, {Toaster} from 'react-hot-toast';
const notify = (msg) => toast(msg);

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string().required('Password required'),
});

const Login = () => {
  const router = useRouter();
  const [isVisible,setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useDispatch();
  const handleLogin = async (inputFields, resetForm) => {
    try{
    const response = await fetch('http://localhost:4000/login/',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(inputFields)
      });
      const data = await response.json();
      if(response.status == 201){
        console.log(data);
        dispatch(loginUser(data));
        router.push('/profile');
      }
      notify( data.msg,
        {
          icon: response.status == 201 ? '✅' : '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    } catch(err) {
      console.log(err)
    } 
    }
    
    const onSubmit=async (values, formikBag) => {
      await handleLogin(values, formikBag.resetForm);
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

export default Login;