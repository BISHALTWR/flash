'use client'
import React from 'react'
import Navbar from '../../components/navbar/page';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const page = () => {
  const { userDetails }  = useSelector(state => state.user);
  console.log(userDetails);
  const user_id = userDetails._id;
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    fetchFileNames();
  }, []);

  const fetchFileNames = async () => {
    try{
      const response = await fetch(`http://localhost:4000/getFileNames/65cd0afaeb9728d5ed50608d`);
      if(response.ok) { // This is nice. If response is 200-299(inclusive)
        const data = await response.json();
        console.log(data.fileNames)
        setFileNames(data.fileNames);
        console.log(fileNames)
      } else {
        console.error('Couldn\'t get fileNames');
      }
    } catch(error) {
      console.error('Error fetching filenames: ', error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <h2>File Names</h2>
                <ul>
                    {fileNames.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                    ))}
                </ul>
    </>
  )
}

export default page