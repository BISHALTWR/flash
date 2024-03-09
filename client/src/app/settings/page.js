// Plan
// Profile tab with name, profile picture, password, email change
// Notification section with some options (pop over(i.e. toast) ?, events?, challenges, competion request maybe )
// Appearance section (later themees, font-size)
"use client";
import React from "react";
import Navbar from "../../components/navbar/page";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    password: "",
    avatar: "",
    profession: "",
    bio: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:4000/getUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userDetails._id }),
      });
      const data = await response.json();
      setUserInfo((prevState) => ({ ...prevState, ...data }));
      setImage(data.avatar);
    };

    getUserInfo();
  }, [userDetails]);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(userInfo);
  // }, [userInfo]);

  const handleSubmit = async (e) => {
    console.log("monke");
    e.preventDefault();
    const response = await fetch("http://localhost:4000/changeUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo }), // add userId to the request body
    });
    console.log(response);
  };
  const handleDeletePicture = async () => {
    const response = await fetch(
      `http://localhost:4000/deleteAvatar/${userDetails._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setImage("");
    } else {
      console.error("Failed to delete picture");
    }
  };
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userDetails._id);

      const response = await fetch("http://localhost:4000/uploadAvatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImage(data.location);
    };


  return (
    <>
      <Navbar navbarText="Settings"></Navbar>
      <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div class="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 class="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
            >
              Public Profile
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
            >
              Account Settings
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              Notifications
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
            >
              PRO Account
            </a>
          </div>
        </aside>
        <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div class="p-2 md:p-4">
            <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 class="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

              <div class="grid max-w-2xl mx-auto mt-8">
                <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={
                      image ||
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    }
                    alt="Bordered avatar"
                  />

                  <div class="flex flex-col space-y-5 sm:ml-8">
                    <input
                      type="file"
                      name="avatar"
                      id="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      onClick={() => document.getElementById("file").click()}
                    >
                      Change picture
                    </button>
                    <button
                      type="button"
                      class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      onClick={handleDeletePicture}
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div class="w-full mb-8">
                      <label
                        for="username"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your Username"
                        value={userInfo ? userInfo.username : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div class="w-full">
                        <label
                          for="firstname"
                          class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your first name
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your first name"
                          value={userInfo ? userInfo.firstname : ""}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div class="w-full">
                        <label
                          for="lastname"
                          class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your last name
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your last name"
                          value={userInfo ? userInfo.lastname : ""}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div class="mb-2 sm:mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="your.email@mail.com"
                        value={userInfo ? userInfo.email : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="mb-2 sm:mb-6">
                      <label
                        for="phoneNumber"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your phoneNumber
                      </label>
                      <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="your.email@mail.com"
                        value={userInfo ? userInfo.phoneNumber : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="mb-2 sm:mb-6">
                      <label
                        for="profession"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Profession
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="your profession"
                        value={userInfo ? userInfo.profession : ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="message"
                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Bio
                      </label>
                      <textarea
                        id="message"
                        name="bio"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                        placeholder="Write your bio here..."
                        onChange={handleChange}
                        value={userInfo ? userInfo.bio : ""}
                      ></textarea>
                    </div>

                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
