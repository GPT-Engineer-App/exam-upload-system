import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  keyword: z.string().nonempty("Keyword is required"),
  semester: z.string().nonempty("Semester is required"),
  course: z.string().nonempty("Course is required"),
});

const coursesBySemester = {
  "112-1": ["Course 1", "Course 2"],
  "112-2": ["Course 3", "Course 4"],
  "113-1": ["Course 5", "Course 6"],
};

const SearchExam = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [results, setResults] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Mock results for demonstration
    setResults([
      { id: 1, title: "Exam 1", course: data.course, semester: data.semester },
      { id: 2, title: "Exam 2", course: data.course, semester: data.semester },
    ]);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input id="keyword" type="text" {...register("keyword")} />
          {errors.keyword && <p className="text-red-500">{errors.keyword.message}</p>}
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Select onValueChange={handleSemesterChange} {...register("semester")}>
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
          <Select {...register("course")}>
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
        <Button type="submit">Search</Button>
      </form>
      <div className="mt-8 w-full">
        {results.map((result) => (
          <Card key={result.id} className="mb-4">
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Course: {result.course}</p>
              <p>Semester: {result.semester}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchExam;