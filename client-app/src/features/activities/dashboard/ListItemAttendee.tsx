import { Avatar, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "~/types";

type Props = {
  attendees?: Profile[];
};

const ListItemAttendee = ({ attendees }: Props) => {
  return (
    <HStack>
      {attendees &&
        attendees.map((a) => (
          <Link key={a.username} to={`/profiles/${a.username}`}>
            <Avatar
              size="sm"
              // src={a?.image ?? "/assets/user.png"}
              name={a.displayName}
            />
          </Link>
        ))}
    </HStack>
  );
};

export default ListItemAttendee;
