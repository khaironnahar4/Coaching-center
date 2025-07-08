"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required!" }),
  subject: z.string().min(1, { message: "Subject is required!" }),
  examType: z.string().min(1, { message: "Exam type is required!" }),
  marksObtained: z
    .number({ invalid_type_error: "Marks must be a number" })
    .min(0, { message: "Marks cannot be negative!" }),
  totalMarks: z
    .number({ invalid_type_error: "Total marks must be a number" })
    .min(1, { message: "Total marks must be at least 1!" }),
  grade: z.string().optional(),
  remarks: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
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
      marksObtained: data?.marksObtained ?? "",
      totalMarks: data?.totalMarks ?? "",
    },
  });

  // Convert string input to number for marks fields
  const handleNumberInput = (name: "marksObtained" | "totalMarks") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(name, value === "" ? 0 : Number(value), { shouldValidate: true });
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // Add your submit logic here
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Result" : "Update Result"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student ID"
          name="studentId"
          defaultValue={data?.studentId}
          register={register}
          error={errors.studentId}
        />
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />
        <InputField
          label="Exam Type"
          name="examType"
          defaultValue={data?.examType}
          register={register}
          error={errors.examType}
        />
        <InputField
          label="Marks Obtained"
          name="marksObtained"
          type="number"
        //   value={watch("marksObtained")}
        //   onChange={handleNumberInput("marksObtained")}
          register={register}
          error={errors.marksObtained}
        />
        <InputField
          label="Total Marks"
          name="totalMarks"
          type="number"
        //   value={watch("totalMarks")}
        //   onChange={handleNumberInput("totalMarks")}
          register={register}
          error={errors.totalMarks}
        />
        <InputField
          label="Grade"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors.grade}
        />
        <InputField
          label="Remarks"
          name="remarks"
          defaultValue={data?.remarks}
          register={register}
          error={errors.remarks}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;