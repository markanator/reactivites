import * as yup from "yup";
import { Activity } from "~/types";

export const ActivityFormSchema = yup
  .object({
    id: yup.string().optional(),
    title: yup.string().required("Required"),
    date: yup.string().required("Required"),
    description: yup.string().required("Required"),
    category: yup.string().required("Required"),
    city: yup.string().required("Required"),
    venue: yup.string().required("Required"),
  })
  .required();

export type IFormData = Omit<Activity, "id">;

export const initialState: Activity = {
  id: "",
  title: "",
  description: "",
  category: "",
  date: "",
  city: "",
  venue: "",
};

export const categoryOptions = [
  { label: "Culture", value: "culture" },
  { label: "Drinks", value: "drinks" },
  { label: "Film", value: "film" },
  { label: "Food", value: "food" },
  { label: "Music", value: "music" },
  { label: "Travel", value: "travel" },
];
