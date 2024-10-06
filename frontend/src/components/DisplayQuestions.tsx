import "./QuestionPaperGenerator.css";
import { Button } from "./ui/button.js";
import { ArrowUpDown } from "lucide-react";
import DynamicTable from "./common/DynamicTable/dynamic-table.js";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface QuestionsProperties {
  difficulty: string;
  marks: number;
  question: string;
  subject: string;
  topic: string;
}

const columns: ColumnDef<QuestionsProperties>[] = [
  {
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("question")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "topic",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("topic")}</div>,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty Level
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty: string = row.getValue("difficulty");
      return <div>{difficulty ? difficulty : "-"}</div>;
    },
  },
  {
    accessorKey: "marks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marks
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const marks: number = row.getValue("marks");
      return <div>{marks ? marks : "-"}</div>;
    },
  },
];

const DisplayQuestions: React.FC = () => {
  const questionPaper: QuestionsProperties[] = useSelector(
    (state: RootState) => state.questions.Questions
  );

  return (
    <main className="w-full h-full p-4">
      <DynamicTable<QuestionsProperties>
        data={questionPaper}
        columns={columns}
        enableSorting
        enablePagination
      ></DynamicTable>
    </main>
  );
};

export default DisplayQuestions;
