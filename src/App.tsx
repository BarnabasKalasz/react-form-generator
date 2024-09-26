import React, { SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import FormState from "./models/FormState.model";
import { Form } from "./components/Form";
import { downloadJSONFile } from "./utils/download-json";
import { chunkQuestions } from "./utils/chunk-questions";
import { formatQuestions } from "./utils/format-questions";
import { Pagination } from "./components/Pagination";

function App() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormState[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const fetchFileContent = async () => {
    try {
      const response = await fetch("/assets/question.txt");

      if (!response.ok) {
        throw new Error("Couldn't access file");
      }

      const text = await response.text();

      setQuestions(
        text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      );
    } catch (error) {
      console.error("Failed to fetch file:", error);
    }
  };

  // Get the questions from a file in assets (TBD, make file upload possible to either upload a Json with the correct format or a txt containing a list of questions)
  useEffect(() => {
    fetchFileContent();
  }, []);

  // Cut the questions to chunks and save the chunks in local storage for pagination, and set the necessary state values
  useEffect(() => {
    let allQuestionsPaginated = chunkQuestions(formatQuestions(questions), 30);

    allQuestionsPaginated.forEach((page, index) => {
      localStorage.setItem(`page-${index + 1}`, JSON.stringify(page));
    });

    setNumberOfPages(allQuestionsPaginated.length);
    setFormData(allQuestionsPaginated[1]);
  }, [questions]);

  // When a page change occurs, get the correct chunk of questions from the local storage
  useEffect(() => {
    let pageData = localStorage.getItem(`page-${currentPage}`) || "";
    pageData && setFormData(JSON.parse(pageData)); // gets and loads the questions for the new currentPage
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    localStorage.setItem(`page-${currentPage}`, JSON.stringify(formData)); // saving the form's state into local storage, before setting a new currentPage (and consequesntly loading a new set of form questions)
    setCurrentPage(page);
  };

  const handleChange = (
    event: SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    questionIndex: number
  ) => {
    const isCheckbox = (element: HTMLElement): element is HTMLInputElement =>
      element instanceof HTMLInputElement && element.type === "checkbox";

    const { name } = event.currentTarget;
    const value = isCheckbox(event.currentTarget)
      ? event.currentTarget.checked
      : event.currentTarget.value; // type guard function to narrow the input type

    setFormData((prevFormData) =>
      prevFormData.map((item, index) =>
        index === questionIndex
          ? {
              ...item,
              [name as keyof FormState]: value,
            }
          : item
      )
    );
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(`page-${currentPage}`, JSON.stringify(formData)); // save current pages formData into the local storage before retrieving all the pages from localstorage for concatenating

    let submittedForm: FormState[] = [];

    Array(numberOfPages).forEach((_, index) => {
      let page = localStorage.getItem(`page-${index + 1}`) || "";
      submittedForm.push(JSON.parse(page));
    });

    downloadJSONFile(submittedForm.flat()); // flat is necessary, since it is originally store in chunks/pages, so it will just dissolve the inner array
  };

  return (
    <div className="App">
      <Form
        formData={formData || []}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {numberOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          numberOfPages={numberOfPages}
        />
      )}
    </div>
  );
}

export default App;
