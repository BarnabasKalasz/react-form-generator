export const handleFileUpload = (e: any, handleContents: (content: string[]) => void) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = (event?.target?.result as string) || null;
      const questionsList: string[] =
        (!!contents &&
          contents
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)) ||
        [];
      handleContents(questionsList);
    };

    if (file) {
      reader.readAsText(file);
    }
  };