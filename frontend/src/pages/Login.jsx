import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    jobs: [
      {
        company: "",
        position: "",
      },
    ],
  });

  // Handle top-level inputs (name, email)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested job inputs using index
  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobs = [...form.jobs];
    updatedJobs[index][name] = value;

    setForm((prev) => ({
      ...prev,
      jobs: updatedJobs,
    }));
  };

  // Append a new job object to the list
  const addJobField = () => {
    setForm((prev) => ({
      ...prev,
      jobs: [...prev.jobs, { company: "", position: "" }],
    }));
  };

  // Remove a specific job object by index
  const removeJobField = (index) => {
    // Keep at least one job field if required, or allow empty array
    const updatedJobs = form.jobs.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      jobs: updatedJobs,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Profile & History Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Top-level fields */}
        <div className="mb-6.25">
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>

        <div className="mb-6.25">
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
            className="border w-full p-2"
          />
        </div>

        {/* Dynamic Jobs Section */}
        <h3>Job History</h3>
        {form.jobs.map((job, index) => (
          <div
            key={index}
            className="border border-solid border-[#ccc] p-3.75 mb-3.75 relative"
          >
            <div className="flex flex-row justify-between items-center">
              <h4>Job #{index + 1}</h4>
              {form.jobs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeJobField(index)}
                  className="bg-[#ff4d4d] text-white py-1.25 px-2.5 cursor-pointer border-none "
                >
                  Remove
                </button>
              )}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Company:
              </label>
              <input
                type="text"
                name="company"
                value={job.company}
                onChange={(e) => handleJobChange(index, e)}
                className="w-full p-2"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Position:
              </label>
              <input
                type="text"
                name="position"
                value={job.position}
                onChange={(e) => handleJobChange(index, e)}
                className="w-full p-2"
                required
              />
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            type="button"
            onClick={addJobField}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            + Add Another Job
          </button>

          <button
            type="submit"
            style={{
              backgroundColor: "#008CBA",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}


//implement useReducer later, use:
// import React from "react";
// import { useReducer } from "react";

// const Login = () => {
//   const initialState = {};
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "ADD_FIELD":
//         return {};
//       case "UPDATE_FIELD":
//         return {};
//       case "DELETE_FIELD":
//         return {};
//       default:
//         throw new Error();
//     }
//   };
//   const [state, dispatch] = useReducer(initialState, reducer);
//   return <></>;
// };

// export default Login;
