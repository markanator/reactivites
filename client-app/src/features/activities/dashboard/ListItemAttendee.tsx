import {
	Avatar,
	HStack,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "~/features/profiles/ProfileCard";
import { Profile } from "~/types";

type Props = {
	attendees?: Profile[];
};

const ListItemAttendee = ({ attendees }: Props) => {
	return (
		<HStack>
			{attendees &&
				attendees.map((profile) => <AttendeePopover key={profile.username} profile={profile} />)}
		</HStack>
	);
};

const AttendeePopover = ({ profile }: { profile: Profile }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	return (
		<Popover
			key={profile.username}
			isLazy
			returnFocusOnClose={false}
			isOpen={isOpen}
			onClose={onClose}
			placement="top-start"
			closeOnBlur={false}
		>
			<PopoverTrigger>
				<Link to={`/profiles/${profile.username}`} onMouseEnter={onOpen} onMouseLeave={onClose}>
					<Avatar
						border="2px solid var(--chakra-colors-gray-100)"
						borderColor={
							profile?.following
								? "var(--chakra-colors-orange-500) !important"
								: "var(--chakra-colors-gray-100)"
						}
						size="sm"
						src={profile?.image ?? "/assets/user.png"}
						name={profile.displayName}
					/>
				</Link>
			</PopoverTrigger>
			<PopoverContent id="content">
				<>
					<ProfileCard profile={profile} />
				</>
			</PopoverContent>
		</Popover>
	);
};

export default ListItemAttendee;
