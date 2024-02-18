'use client'
import React from 'react'
import Navbar from '../../components/navbar/page';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCodeInRange,fetchFileNames } from '@/components/codeFuntions/page';
import CodeBlock from '@/components/codeBlock/page'; //props code and file_name
import {Input, Button } from '@nextui-org/react';
import { VscAdd } from "react-icons/vsc";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import toast, {Toaster} from 'react-hot-toast';
const notify = (msg) => toast(msg);
import { useRouter } from 'next/navigation'; //for app router


const page = () => {
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { userDetails }  = useSelector(state => state.user);
  const user_id = userDetails._id;
  const [fileNames, setFileNames] = useState([]);
  const [code, setCode] = useState([]);
  const [NewFileName, setNewFileName] = useState("");

  useEffect(() => {
    const fetchNamesAndCode = async () => {
      const names = await fetchFileNames(user_id);
      console.log("names received", names);
      setFileNames([...names]);
  
      if (names.length > 0) {
        console.log("i am in fetch region");
        const codes = await fetchCodeInRange(names, 1, 10, user_id);
        console.log(codes);
        setCode(codes);
      }
    };
  
    fetchNamesAndCode();
  }, []);

  const CreateNewFile = async (file_name) => {
    try{

      if(!file_name){
          notify("Can't create a file with no name ❌");
          return;
      } else if (fileNames.includes(file_name)){
          notify("File already exists ❌")
      } else {
        const response = await fetch(`http://localhost:4000/saveCode/`,{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "user_id": user_id,
                "file_name": file_name,
                "code": "console.log('hello world!');"
            })
        });
        const data = await response.json();
        console.log(data,response);
        if(response.ok){
          notify("File created successfully ✅");
          router.push(`./compiler/?filename=${file_name}`)
        }
      }
  } catch(err) {
      console.log(err);
  }
  }

  return (
    <>
      <Navbar/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-between -m-4">
          {/* <div className='grid grid-cols-3'> */}
            {code.map((codeSnippet, index) => {
              console.log(codeSnippet,"Code snippet");
              return (<CodeBlock code={codeSnippet} file_name={fileNames[index]} fileNames={fileNames} user_id={user_id}></CodeBlock>)
            })}
          <div className="p-2 lg:w-2/6 md:w-1/2 w-full -m-4 min-w-[500px]">
            <div className = "h-60 overflow-hidden border border-t-4 border-gray-600 rounded-[15px] m-4 bg-white flex justify-center items-center">
              <Button onPress={onOpen} color="success"><VscAdd/></Button>
              <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create and open new file:</ModalHeader>
              <ModalBody>
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="fileName"
                  isRequired="true"
                  placeholder="Enter filename"
                  type="text"
                  variant="bordered"
                  value={NewFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={onClose} onClick={()=>{CreateNewFile(NewFileName)}}>
                  Create and Open
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </div>
          </div> 
          </div>
        </div>
      </section>
    </>
  )
}

export default page;