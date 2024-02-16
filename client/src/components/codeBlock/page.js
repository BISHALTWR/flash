//Code Mirror
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useState } from 'react';
import {Input, Button} from '@nextui-org/react';
import  Link  from 'next/link';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import toast, {Toaster} from 'react-hot-toast';
const notify = (msg) => toast(msg);

const codeBlock = (props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [NewFileName, setNewFileName] = useState("");

  const Rename = async (user_id, file_name, new_name) => {
    try{

      if(!new_name){
          notify("Can't change the name to empty ❌");
          return;
      } else if (props.fileNames.includes(new_name)){
          notify("Another file with same name already exists ❌")
      } else {
        const response = await fetch(`http://localhost:4000/rename/`,{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "user_id": user_id,
                "file_name": file_name,
                "new_name": new_name
            })
        });
        const data = await response.json();
        console.log(data,response);
        if(response.ok){
          //reload this page here and toast
        }
      }
  } catch(err) {
      console.log(err);
  }
  }

    return (
        <div className = "p-2 lg:w-1/4 md:w-1/2 w-full -m-4 min-w-[400px] ">
          <div className = "overflow-hidden border border-t-4 border-gray-600 rounded-[15px] m-4 bg-white">
                    <a className="relative h-48 rounded overflow-hidden">
                      <CodeMirror className="object-cover object-center w-full h-full block" value={props.code} height="200px" extensions={[javascript({ jsx: true })]} readOnly={true}/>
                    </a>
                    <div className="mt-0 pb-4 text-gray-900 title-font text-center font-medium bg-gray-100">
                        <Link href={`/?filename=${props.file_name}`}>
                        <h2>
                            {props.file_name}
                        </h2>
                        </Link>
                        <Button onPress={onOpen}>ChangeName</Button>
              <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rename file:</ModalHeader>
              <ModalBody>
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="fileName"
                  isRequired="true"
                  placeholder="New filename"
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
                <Button color="primary" onPress={onClose} onClick={()=>{Rename(props.user_id, props.file_name,NewFileName)}}>
                  Rename
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
                    </div>
          </div>
        </div> 
    )
}

export default codeBlock;