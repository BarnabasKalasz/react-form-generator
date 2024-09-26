import FormState from "../models/FormState.model";

export const downloadJSONFile = (data: FormState[]) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "form-data.json";
  a.click();

  URL.revokeObjectURL(url);
};
