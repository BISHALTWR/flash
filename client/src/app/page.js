"use client";
import React from "react";
import Navbar from "../components/navbar/page";
import Link from "next/link";
import { useSelector } from "react-redux";

// UI imports
import { VscVmRunning } from "react-icons/vsc";
import { SiLevelsdotfyi } from "react-icons/si";
// import { GiBattleGear } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";

const Card = ({ href, icon: Icon, title, description }) => (
  <div className="xl:w-1/3 md:w-1/2 p-4">
    <Link href={href} className="hover:underline decoration-emerald500">
      <div className="border border-gray-200 p-6 rounded-lg hover:bg-blue-100">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <Icon />
        </div>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{title}</h2>
        <p className="leading-relaxed text-base">{description}</p>
      </div>
    </Link>
  </div>
);

const page = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Flash</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Multipurpose tool for getting better at programming.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            <Card
              href={!isLoggedIn ? "./compiler" : "./code"}
              icon={VscVmRunning}
              title="Execute Code"
              description="Use our web based compilers to execute your code online without hassle of setting up IDEs and Compilers"
            />
            <Card
              href={"./challenges"}
              icon={SiLevelsdotfyi}
              title="Complete Challenges"
              description="Practice programming under pressure with our timed test that come in variety of difficulty level"
            />
            <Card
              href={"#"}
              icon={FaBookReader}
              title="Learn(Coming Soon)"
              description="Learn new programming concepts and languages with out amazing archive of resources"
            />
            <Card
              href={"#"}
              icon={FaRegCircleQuestion}
              title="FAQ(Coming Soon)"
              description="Have a question? Check out our frequently asked questions"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;