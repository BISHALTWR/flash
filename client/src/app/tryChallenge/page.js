"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";
import CodeMirror from "@uiw/react-codemirror";
import { fetchChallengeById } from "../../components/challengeFunctions/page";
import { javascript } from "@codemirror/lang-javascript";
import { SiLevelsdotfyi } from "react-icons/si";
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
import { useSearchParams } from "next/navigation";

const page = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.user); // User details
  const user_id = userDetails._id;
  const params = useSearchParams();
  const receivedChallengeId = params.get("challenge_id");
  const [challenge, setChallenge] = useState({ challenge_name: "null" });
  const [user_solution, setUserSolution] = useState("");
  const outputRef = React.useRef(null);
  const [output, setOutput] = useState("");
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      console.log("received challenge id: ", receivedChallengeId);
      const fetchedChallenge = await fetchChallengeById(receivedChallengeId);
      console.log("Challenge received", fetchedChallenge);
      setChallenge(fetchedChallenge);
      setUserSolution(fetchedChallenge.boilerplate);
    };
    fetchChallenge();
  }, [receivedChallengeId]);

  const onChange = (user_solution) => {
    setUserSolution(user_solution);
  };

  return (
    <>
      <Navbar
        navbarText={
          challenge.challenge_name ? challenge.challenge_name : "Loading"
        }
      />
      <section className="text-gray-600 body-font relative bg-sky-100 h-[93vh]">
        <div className="container px-5 py-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto sm:mr-10 w-full p-10">
            <div class="border border-gray-200 p-6 rounded-lg hover:bg-blue-100">
              <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <SiLevelsdotfyi />
              </div>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                {challenge.challenge_name}
              </h2>
              <p class="leading-relaxed text-base">
                {challenge?.description?.short}
              </p>
              <hr />
              <p class="leading-relaxed text-base">
                {challenge?.description?.long}
              </p>
            </div>
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
                  <p className="font-bold text-inherit pb-[1px]">{`Add solution to ${challenge.challenge_name} here:`}</p>
                </NavbarBrand>

                <NavbarItem>
                  <div
                    style={{ alignSelf: "center" }}
                    className="ml-[5vw] w-[fit-content] mt-[5px] mb-[5px]"
                  >
                    <Button
                      size="sm"
                      onClick={async () => {
                        const result = await Run(
                          challenge.test_values + "\n" + user_solution,
                        );
                        setOutput(result);
                        const actual_output = await Run(
                          challenge.test_values + "\n" + challenge.solution,
                        );
                        outputRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        if (result === actual_output) {
                          console.log("✅ Correct");
                        } else {
                          notify("❌ Wrong! Try again!");
                        }
                      }}
                      className="content-center bg-sky-500"
                    >
                      <VscRunAll />
                    </Button>
                  </div>
                </NavbarItem>
              </NextNavbar>
              <CodeMirror
                value={user_solution}
                options={{
                  scrollbarStyle: null,
                }}
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                height="45vh"
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
