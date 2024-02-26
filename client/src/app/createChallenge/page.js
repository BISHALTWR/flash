"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { VscRunAll } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Run } from "../../components/codeFuntions/page";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaRegCopy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; //for app router
const notify = (msg) => toast(msg);

const page = () => {
  const Router = useRouter();
  const { userDetails } = useSelector((state) => state.user);
  const user_id = userDetails._id;
  const [newChallengeName, setNewChallengeName] = useState("");
  const [output, setOutput] = useState("");
  const [solution, setSolution] = useState("");
  const [descLong, setDescLong] = useState("");
  const [descShort, setDescShort] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [difficulty, setDifficulty] = useState("Easy");
  const outputRef = React.useRef(null);

  const [boilerplate, setBoilerplate] = useState(
    `let solution = function(test) {
        // Remove this line and add necessary boilerplate code here.
        /* Write your solution below this line */\n
        /* Write your solution above this line */
    }
    console.log(solution(test));`,
  );

  const [testValues, setTestValues] = useState(
    "//Initialize test values here \n let test = [];",
  );

  const onChange = (solution) => {
    setSolution(solution);
  };

  const CreateNewChallenge = async (challengeName) => {
    try {
      if (!challengeName) {
        notify("Can't create a file with no name ❌");
        return;
      }

      // setDescription({short: descShort, long: descLong});
      const newChallenge = {
        user_id: userDetails._id,
        difficulty: difficulty,
        description: { short: descShort, long: descLong },
        challenge_name: challengeName,
        boilerplate: boilerplate,
        solution: solution,
        test_values: testValues,
      };

      const response = await fetch(`http://localhost:4000/saveChallenge/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newChallenge),
      });
      const data = await response.json();
      console.log(data, response);
      if (response.ok) {
        notify("Challenge created successfully ✅");
        Router.push("/challenges");
      }
    } catch (err) {
      notify("Error", err, "❌");
      console.log(err);
    }
  };
  return (
    <>
      <Navbar navbarText="New Challenge" />
      <section className="text-gray-600 body-font relative bg-sky-100 h-[93vh]">
        <div className="container px-5 py-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto sm:mr-10 w-full p-10">
            <div className="flex flex-row content-center h-fit items-center">
              <Input
                className=" text-lg font-large title-font w-full"
                placeholder="Challenge name"
                value={newChallengeName}
                onChange={(event) => {
                  setNewChallengeName(event.target.value);
                }}
              />

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {difficulty}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Difficulty"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(key) => {
                    setSelectedKeys(key);
                    setDifficulty(key.currentKey);
                  }}
                >
                  <DropdownItem key="Easy">Easy</DropdownItem>
                  <DropdownItem key="Medium">Medium</DropdownItem>
                  <DropdownItem key="Hard">Hard</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="short_description"
                className="leading-7 text-sm text-gray-600"
              >
                Short Description
              </label>
              <input
                type="text"
                id="short_description"
                name="short_description"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={descShort}
                onChange={(event) => {
                  setDescShort(event.target.value);
                }}
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="long_description"
                className="leading-7 text-sm text-gray-600"
              >
                Long Description
              </label>
              <textarea
                id="long_description"
                name="long_description"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-22 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={descLong}
                onChange={(event) => {
                  setDescLong(event.target.value);
                }}
              ></textarea>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="test_values"
                className="leading-7 text-sm text-gray-600"
              >
                Test values:{" "}
              </label>
              <textarea
                id="test_values"
                name="test_values"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-22 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={testValues}
                onChange={(event) => {
                  setTestValues(event.target.value);
                }}
              ></textarea>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="boilerplate"
                className="leading-7 text-sm text-gray-600"
              >
                BoilerPlate code:{" "}
              </label>
              <textarea
                id="boilerplate"
                name="boilerplate"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-64 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={boilerplate}
                onChange={(event) => {
                  setBoilerplate(event.target.value);
                }}
              ></textarea>
            </div>

            <button
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={() => {
                CreateNewChallenge(newChallengeName);
              }}
            >
              Create Challenge
            </button>
            <p className="text-xs text-gray-500 mt-3 danger"></p>
          </div>
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden overflow-x-hidden flex items-end justify-start relative">
            <div
              style={{
                height: "85vh",
                overflow: "hidden",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <NextNavbar className="bg-blue-300">
                <NavbarBrand>
                  <p className="font-bold text-inherit pb-[1px]">{`Add solution to ${newChallengeName}:`}</p>
                </NavbarBrand>

                <NavbarItem>
                  <div
                    style={{ alignSelf: "center" }}
                    className="ml-[5vw] w-[fit-content] mt-[5px] mb-[5px]"
                  >
                    <Tooltip content="Copy Boilerplate Code">
                      <Button
                        size="sm"
                        onClick={() => setSolution(boilerplate)}
                        className="bg-success-50 mr-2"
                      >
                        <FaRegCopy />
                      </Button>
                    </Tooltip>
                    <Button
                      size="sm"
                      onClick={async () => {
                        const result = await Run(testValues + "\n" + solution);
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
                  </div>
                </NavbarItem>
              </NextNavbar>
              <CodeMirror
                value={solution}
                options={{
                  scrollbarStyle: null,
                }}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                height="45vh"
                placeholder={`
                READ THIS !!!\n
                During test.. testValues + user's solution will be executed to get logged result
                And it will be compared with logged result of testValues + your solution.
                Use the copy boilerplate button above if required.
                `}
              />
              <div
                className=" bg-white overflow-auto h-[40vh] p-[10px] pb-[30px] pt-[5px]"
                ref={outputRef}
              >
                {output.split("\n").map((value, index) => {
                  return <p>{value}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
