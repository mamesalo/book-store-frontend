import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";
const CreateBooks = () => {
  const [title, settitle] = useState("");
  const [publishYear, setpublishYear] = useState("");
  const [author, setauthor] = useState("");
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear,
      image,
    };
    axios
      .post(`${SERVER_URL}/book`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
            onChange={(e) => setimage(e.target.files[0])}
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
