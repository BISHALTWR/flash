//Code Mirror
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
const notify = (msg) => toast(msg);
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/react";
import { CgRename } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { MdOpenInFull } from "react-icons/md";

const codeBlock = (props) => {
  const {
    isOpen: isRenameOpen,
    onOpen: onRenameOpen,
    onOpenChange: onRenameOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const [NewFileName, setNewFileName] = useState("");
  const [confirm, setConfirm] = useState("");

  const Rename = async (user_id, file_name, new_name) => {
    try {
      if (!new_name) {
        notify("Can't change the name to empty ❌");
        return;
      } else if (props.fileNames.includes(new_name)) {
        notify("Another file with same name already exists ❌");
      } else {
        const response = await fetch(`http://localhost:4000/rename/`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: user_id,
            file_name: file_name,
            new_name: new_name,
          }),
        });
        const data = await response.json();
        console.log(data, response);
        if (response.ok) {
          notify("Renamed Successfully ✅");
          props.fetchNamesAndCode();
          //reload this page here and toast
          // or maybe try changing fileName
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Delete = async (confirm, user_id, file_name) => {
    try {
      if (confirm !== "CONFIRM") {
        notify("Please type 'CONFIRM' ❌");
        return;
      } else {
        const response = await fetch(`http://localhost:4000/removeFile/`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: user_id,
            file_name: file_name,
          }),
        });
        const data = await response.json();
        console.log(data, response);
        if (response.ok) {
          notify("Deleted Successfully ✅");
          props.fetchNamesAndCode();
          //reload or change filename
        }
      }
    } catch (err) {
      console.log("Error");
    }
  };

  return (
    <div className="p-2 lg:w-2/6 md:w-1/2 w-full -m-4 min-w-[500px] ">
      <div className="overflow-hidden border border-t-4 border-blue-300 rounded-[15px] m-4 bg-white">
        <div className="relative h-48 rounded overflow-hidden">
          <CodeMirror
            className="object-cover object-center w-full h-full block"
            value={props.code}
            height="200px"
            extensions={[javascript({ jsx: true })]}
            readOnly={true}
          />
        </div>

        {/* Navbar with filename, rename button and remove button */}
        <NextNavbar>
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link
              href={`/compiler/?filename=${props.file_name}`}
              className="flex items-center hover:text-blue-500"
            >
              <p className="font-bold text-inherit pb-[1px] mr-2 max-w-[80px] overflow-scroll">
                {props.file_name}
              </p>
              <MdOpenInFull />
            </Link>
          </NavbarBrand>
          <NavbarItem>
            <div
              style={{ alignSelf: "center" }}
              className="ml-[5vw] w-[fit-content] mt-[5px] mb-[5px]"
            >
              {/* Rename button with modal(popover) */}
              <>
                <Button onPress={onRenameOpen} size="sm" className="bg-sky-500">
                  <CgRename size="25px" />
                </Button>
                <Modal
                  isOpen={isRenameOpen}
                  onOpenChange={onRenameOpenChange}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Rename file:
                        </ModalHeader>
                        <ModalBody>
                          <Input
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
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            color="primary"
                            onPress={onClose}
                            onClick={() => {
                              Rename(
                                props.user_id,
                                props.file_name,
                                NewFileName,
                              );
                            }}
                          >
                            Rename
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
              {/* Delete button with modal(popover) */}
              <>
                <Button
                  onPress={onDeleteOpen}
                  size="sm"
                  color="danger"
                  className="mr-[4px] ml-[4px]"
                >
                  <MdDeleteOutline size="25px" />
                </Button>
                <Modal
                  isOpen={isDeleteOpen}
                  onOpenChange={onDeleteOpenChange}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Delete file:
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            // endContent={
                            //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            // }
                            label="fileName"
                            isRequired="true"
                            placeholder="Type 'CONFIRM'"
                            type="text"
                            variant="bordered"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            color="danger"
                            onPress={onClose}
                            onClick={() => {
                              Delete(confirm, props.user_id, props.file_name);
                            }}
                          >
                            Delete
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
            </div>
          </NavbarItem>
        </NextNavbar>
      </div>
    </div>
  );
};

export default codeBlock;
