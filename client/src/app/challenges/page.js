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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const page = () => {
  const Router = useRouter();
  const { isLoggedIn, userDetails } = useSelector((state) => state.user); // User details
  const user_id = userDetails._id;
  const [challenges, setChallenges] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      const fetchedChallenges = await fetchChallengesInRange(user_id, 0, 9);
      setChallenges(fetchedChallenges);
    };
    fetchChallenges();
  }, []);

  const handleEyeIconClick = (challenge) => {
    setSelectedChallenge(challenge);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/removeChallenge/${user_id}/${selectedChallenge.challenge_name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      // Remove the deleted challenge from the local state
      setChallenges(challenges.filter((c) => c._id !== selectedChallenge._id));

      // Close the popover
      setIsPopoverOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              <TableRow key={challenge._id}>
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
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => handleEyeIconClick(challenge)}
                      >
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip content="Edit challenge">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => {
                          Router.push(
                            `/editChallenge/?challenge_id=${challenge._id}`
                          );
                        }}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Popover placement="right">
                        <PopoverTrigger>
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                          </span>
                        </PopoverTrigger>
                      <PopoverContent>
                        <Button color="danger" auto onClick={handleDelete}>
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
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
      {selectedChallenge && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedChallenge.challenge_name}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedChallenge.description.short}</p>
                  <p>{selectedChallenge.description.long}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() =>
                      Router.push(
                        `/tryChallenge/?challenge_id=${selectedChallenge._id}`
                      )
                    }
                  >
                    Try Challenge
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default page;
