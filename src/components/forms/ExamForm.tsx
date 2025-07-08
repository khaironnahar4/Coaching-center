"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  examTitle: z.string().min(1, { message: "Exam title is required!" }),
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  section: z.string().min(1, { message: "Section is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  totalMarks: z
    .number({ invalid_type_error: "Total marks must be a number" })
    .min(1, { message: "Total marks must be at least 1!" }),
  duration: z.string().min(1, { message: "Duration is required!" }),
  description: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      totalMarks: data?.totalMarks ?? "",
    },
  });

  // Convert string input to number for totalMarks
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("totalMarks", value === "" ? 0 : Number(value), { shouldValidate: true });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit((data) => { console.log(data); })}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Exam" : "Update Exam"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam Title"
          name="examTitle"
          defaultValue={data?.examTitle}
          register={register}
          error={errors.examTitle}
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
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Total Marks"
          name="totalMarks"
          type="number"
        //   value={watch("totalMarks")}
        //   onChange={handleNumberInput}
          register={register}
          error={errors.totalMarks}
        />
        <InputField
          label="Duration (e.g. 2 hours)"
          name="duration"
          defaultValue={data?.duration}
          register={register}
          error={errors.duration}
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
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;