import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  semester: z.string().nonempty("Semester is required"),
  course: z.string().nonempty("Course is required"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "File is required")
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
});

const coursesBySemester = {
  "112-1": ["Course 1", "Course 2"],
  "112-2": ["Course 3", "Course 4"],
  "113-1": ["Course 5", "Course 6"],
};

const UploadExam = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
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

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    setValue("semester", semester); // Update the form value
  };

  const handleCourseChange = (course) => {
    setValue("course", course); // Update the form value
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Select onValueChange={handleSemesterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="112-1">112-1</SelectItem>
              <SelectItem value="112-2">112-2</SelectItem>
              <SelectItem value="113-1">113-1</SelectItem>
            </SelectContent>
          </Select>
          {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Select onValueChange={handleCourseChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {selectedSemester &&
                coursesBySemester[selectedSemester].map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.course && <p className="text-red-500">{errors.course.message}</p>}
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