import { Button, Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";
import { Form } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import * as yup from "yup";
import InputField from "~/components/forms/Input";
import InputTextArea from "~/components/forms/InputTextArea";
import { observer } from "mobx-react-lite";

type Props = {
	setEditMode: (editMode: boolean) => void;
};
interface FormData {
	displayName?: string;
	bio?: string;
}

const formSchema = yup
	.object({
		displayName: yup.string().required(),
		bio: yup.string().optional(),
	})
	.required();

const ProfileEditForm = ({ setEditMode }: Props) => {
	const {
		profileStore: { profile, updateProfile },
	} = useStoreContext();
	const handleEditSubmit = (values: FormData) => {
		updateProfile(values).then(() => {
			setEditMode(false);
		});
	};
	return (
		<Formik
			enableReinitialize
			initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
			onSubmit={handleEditSubmit}
			validationSchema={formSchema}
		>
			{({ isSubmitting, isValid, dirty, handleSubmit }) => (
				<Form style={{ width: "100%" }} onSubmit={handleSubmit}>
					<Flex mt={8} flexDir="column" w="full" experimental_spaceY={6}>
						<InputField placeholder="Display Name" name="displayName" />
						<InputTextArea resize="vertical" rows={3} placeholder="Add your bio" name="bio" />
						<Button type="submit" isLoading={isSubmitting} disabled={!isValid || !dirty}>
							Update profile
						</Button>
					</Flex>
				</Form>
			)}
		</Formik>
	);
};

export default observer(ProfileEditForm);
