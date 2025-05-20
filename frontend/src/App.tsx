import { useState, ChangeEvent, FormEvent } from "react";

interface CompileDataRequest {
  studyid: string;
  path_db: string;
  fake_study: boolean;
  use_xpt_file: boolean;
  use_none: boolean;
}

interface CompileDataResponse {
  STUDYID: string;
  USUBJID: string;
  Species: string;
  SEX: string;
  ARMCD: string;
  SETCD: string;
}

function App() {
  const [formData, setFormData] = useState<CompileDataRequest>({
    studyid: "",
    path_db: "",
    fake_study: false,
    use_xpt_file: false
  });

  const [result, setResult] = useState<CompileDataResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_compile_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to fetch data");
      }
    } catch (err: any) {
      setError("Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add this function inside your App component, just before the return statement:

const MAX_ROWS = 10; // set your desired max rows here

const renderTable = () => {
  if (!result || result.length === 0) return <p>No data found.</p>;

  const headers = Object.keys(result[0]);
  const rowsToShow = result.slice(0, MAX_ROWS); // limit rows

  return (
    <table border={1} cellPadding={5} style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} style={{ backgroundColor: "#f0f0f0" }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsToShow.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Compile Data</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Study ID:</label>
          <input
            type="text"
            name="studyid"
            value={formData.studyid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Path to DB:</label>
          <input
            type="text"
            name="path_db"
            value={formData.path_db}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="fake_study"
              checked={formData.fake_study}
              onChange={handleChange}
            />
            Fake Study
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="use_xpt_file"
              checked={formData.use_xpt_file}
              onChange={handleChange}
            />
            Use XPT File
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Compile Data"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results:</h2>
          {renderTable()}
        </div>
      )}
    </div>
  );
}

export default App;
