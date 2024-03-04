"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; //for app router

// Modules
import { fetchChallengesInRange } from "../../components/challengeFunctions/page";

//NEXT UI IMPORTS
import { Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { VscAdd } from "react-icons/vsc";
import { Link } from "@nextui-org/react";

const page = () => {
  const Router = useRouter();
  const { isLoggedIn, userDetails } = useSelector((state) => state.user); // User details
  const user_id = userDetails._id;
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      const fetchedChallenges = await fetchChallengesInRange(user_id, 0, 9);
      setChallenges(fetchedChallenges);
    };
    fetchChallenges();
  }, []);
  return (
    <div>
      <Navbar />
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DIFFICULTY</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {challenges.map((challenge) => {
            return (
              <TableRow>
                <TableCell>
                  <Link href={`/tryChallenge/?challenge_id=${challenge._id}`}>
                    {challenge.challenge_name}
                  </Link>
                </TableCell>
                <TableCell>{challenge?.difficulty}</TableCell>
                <TableCell>{challenge?.description?.short}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip content="Edit challenge">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete challenge">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isLoggedIn ? (
        <div className="flex justify-center mt-5">
          <Tooltip content="Create a New challenge">
            <Button
              onPress={() => Router.push("./createChallenge")}
              color="success"
              className="mx-auto"
            >
              <VscAdd />
            </Button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default page;
