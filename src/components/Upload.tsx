import React, { useState } from "react";
import axiosInstance from "./Axios";
import { Box } from "@mui/material";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<any>(null); // For holding the OCR result
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file) {
      setIsLoading(true); // Start loading
      const formData = new FormData();
      formData.append("image", file); // Correct field name to "image"

      try {
        const response = await axiosInstance.post("/api/extract", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setOcrResult(response.data); // Set the full response data
        } else {
          throw new Error("Failed to extract text from the image.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the file.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      alert("Please select a document to upload.");
    }
  };

  return (
    <Box>
      <div style={styles.container}>
        <h2>Upload Your Document</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="document" style={styles.label}>
            Select or Take a Photo:
          </label>
          <input
            type="file"
            id="document"
            name="document"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={styles.input}
          />
          {file && <p style={styles.fileName}>Selected file: {file.name}</p>}
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>

        {ocrResult && (
          <div style={styles.resultContainer}>
            <h3>OCR Result:</h3>
            {ocrResult.message && <p>{ocrResult.message}</p>}
            {ocrResult.extracted_data && (
              <ul style={styles.resultList}>
                {Object.entries(ocrResult.extracted_data).map(([key, value]) => (
                  <li key={key} style={styles.resultItem}>
                    <strong>{key}: </strong> {value || ""}
                  </li>
                ))}
              </ul>
            )}
            {ocrResult.json_file_name && (
              <p>
                <strong>JSON File Name:</strong> {ocrResult.json_file_name}
              </p>
            )}
          </div>
        )}
      </div>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "15px",
    width: "90%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold" as const,
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  fileName: {
    fontSize: "14px",
    color: "#555",
  },
  resultContainer: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "400px",
  },
  resultList: {
    listStyleType: "none",
    padding: "0",
  },
  resultItem: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "8px",
  },
};

export default Upload;
