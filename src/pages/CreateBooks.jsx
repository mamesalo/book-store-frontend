import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";
const CreateBooks = () => {
  const [base64Image, setBase64Image] = useState("");
  const [title, settitle] = useState("");
  const [publishYear, setpublishYear] = useState("");
  const [author, setauthor] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear,
      image: base64Image,
    };
    axios
      .post(`${SERVER_URL}/book`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("book created successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-4">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-4">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setpublishYear(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="form-label text-gray-500">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleFileUpload}
          />
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
