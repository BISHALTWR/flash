"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { Button, Input } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux"; // For userdetails
import { useSearchParams } from "next/navigation";
import { Run, Save } from "../../components/codeFuntions/page";
import Split from "react-split";
import { VscRunAll } from "react-icons/vsc";
import { AiOutlineSave } from "react-icons/ai";
import { fetchCode } from "../../components/codeFuntions/page";

const Page = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.user); // User details
  const user_id = userDetails._id;
  const [output, setOutput] = useState("");
  const [value, setValue] = useState("");
  const [file_name, setFileName] = useState("");
  const params = useSearchParams();
  const receivedFileName = params.get("filename");
  const outputRef = React.useRef(null);

  useEffect(() => {
    if (receivedFileName) {
      setFileName(receivedFileName);
      console.log(receivedFileName);
      const codeFetched = async () => {
        let fetched = await fetchCode(receivedFileName, user_id);
        console.log(fetched);
        setValue(fetched);
        return fetched;
      };
      codeFetched();
    }
  }, [receivedFileName]);

  const onChange = (value) => {
    console.log("value:", value);
    setValue(value);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-sky-100">
      <Navbar />

      <Split
        minSize={[500, 100]}
        className="split max-w-[90vw] ml-auto mr-auto mt-2 outline-1 rounded-[20px] overflow-hidden h-[90vh]"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            height: "100%",
          }}
          className="rounded-[20px] overflow-hidden"
        >
          {/* <div className="rounded-[20px] overflow-hidden"> */}
          <NextNavbar className="bg-blue-300">
            <NavbarBrand>
              <p className="font-bold text-inherit pb-[1px]">
                {file_name + ". js"}
              </p>
            </NavbarBrand>

            <NavbarItem>
              <div
                style={{ alignSelf: "center" }}
                className="ml-[5vw] w-[fit-content] mt-[5px] mb-[5px]"
              >
                <Button
                  size="sm"
                  onClick={async () => {
                    const result = await Run(value);
                    setOutput(result);
                    outputRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="content-center bg-sky-500"
                >
                  <VscRunAll />
                </Button>
                <Button
                  size="sm"
                  onClick={() => Save(value, file_name, user_id)}
                  className="content-center bg-emerald-500 ml-4 mr-4"
                >
                  <AiOutlineSave />
                </Button>
              </div>
            </NavbarItem>
          </NextNavbar>
          <div style={{ height: "85vh", overflow: "auto" }}>
            <CodeMirror
              value={value}
              options={{
                scrollbarStyle: null,
              }}
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
              height="85vh"
            />
          </div>
          {/* </div> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            height: "100%",
          }}
          className="rounded-[20px] overflow-hidden"
        >
          <NextNavbar className="bg-blue-300">
            <NavbarBrand>
              {/* <AcmeLogo /> */}
              <p className="font-bold text-center w-full">{"Output"}</p>
            </NavbarBrand>
          </NextNavbar>
          <div
            className=" bg-white overflow-auto h-[85vh] p-[10px] pb-[30px] pt-[5px]"
            ref={outputRef}
          >
            {output.split("\n").map((value, index) => {
              return <p>{value}</p>;
            })}
          </div>
        </div>
      </Split>
    </div>
  );
};

export default Page; // This allows you to import and use this component in other files
