import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  course: z.string().nonempty("Course is required"),
  year: z.string().nonempty("Year is required"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "File is required")
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
});

const UploadExam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Handle file upload logic here
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="course">Course</Label>
          <Select {...register("course")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course1">Course 1</SelectItem>
              <SelectItem value="course2">Course 2</SelectItem>
              <SelectItem value="course3">Course 3</SelectItem>
            </SelectContent>
          </Select>
          {errors.course && <p className="text-red-500">{errors.course.message}</p>}
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Select {...register("year")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          {errors.year && <p className="text-red-500">{errors.year.message}</p>}
        </div>
        <div>
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" {...register("file")} />
          {errors.file && <p className="text-red-500">{errors.file.message}</p>}
        </div>
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};

export default UploadExam;