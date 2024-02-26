"use client";
import React from "react";
import Navbar from "../components/navbar/page";
import { VscVmRunning } from "react-icons/vsc";
import { SiLevelsdotfyi } from "react-icons/si";
import { GiBattleGear } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Link from "next/link";
import { useSelector } from "react-redux";

const page = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  return (
    <>
      <Navbar />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Flash
            </h1>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Multipurpose tool for getting better at programming.
            </p>
          </div>

          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={!isLoggedIn ? "./compiler" : "./code"}
                className="hover:underline decoration-emerald-500"
              >
                <div class="border border-gray-200 p-6 rounded-lg hover:bg-blue-100">
                  <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <VscVmRunning />
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                    Execute Code
                  </h2>
                  <p class="leading-relaxed text-base">
                    Use our web based compilers to execute your code online
                    without hassle of setting up IDEs and Compilers
                  </p>
                </div>
              </Link>
            </div>

            <div class="xl:w-1/3 md:w-1/2 p-4">
              <Link
                href={"./challenges"}
                className="hover:underline decoration-emerald-500"
              >
                <div class="border border-gray-200 p-6 rounded-lg hover:bg-blue-100">
                  <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <SiLevelsdotfyi />
                  </div>
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                    Complete Challenges
                  </h2>
                  <p class="leading-relaxed text-base">
                    Practice programming under pressure with our timed test that
                    come in variety of difficulty level
                  </p>
                </div>
              </Link>
            </div>

            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <GiBattleGear />
                </div>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                  Compete
                </h2>
                <p class="leading-relaxed text-base">
                  More of a team player? Challenge your friends or strangers to
                  coding challenges.
                </p>
              </div>
            </div>

            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaBookReader />
                </div>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                  Learn
                </h2>
                <p class="leading-relaxed text-base">
                  Dont know where to start? Navigate through recommended
                  resources to learn programming
                </p>
              </div>
            </div>

            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaRegCircleQuestion />
                </div>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                  Coming Soon...
                </h2>
                <p class="leading-relaxed text-base">
                  We are planning to add some more resources soon. Good some
                  suggestions?
                </p>
              </div>
            </div>

            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaRegCircleQuestion />
                </div>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                  Coming Soon...
                </h2>
                <p class="leading-relaxed text-base">
                  We are planning to add some more resources soon. Good some
                  suggestions?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
