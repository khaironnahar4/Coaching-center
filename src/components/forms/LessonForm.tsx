"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  lessonTitle: z.string().min(1, { message: "Lesson title is required!" }),
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  section: z.string().min(1, { message: "Section is required!" }),
  teacherId: z.string().min(1, { message: "Teacher ID is required!" }),
  description: z.string().optional(),
  date: z.string().min(1, { message: "Date is required!" }),
});

type Inputs = z.infer<typeof schema>;

const LessonForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // Add your submit logic here
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Assign Lesson" : "Update Lesson"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lesson Title"
          name="lessonTitle"
          defaultValue={data?.lessonTitle}
          register={register}
          error={errors.lessonTitle}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors.class}
        />
        <InputField
          label="Section"
          name="section"
          defaultValue={data?.section}
          register={register}
          error={errors.section}
        />
        <InputField
          label="Teacher ID"
          name="teacherId"
          defaultValue={data?.teacherId}
          register={register}
          error={errors.teacherId}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Assign" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;