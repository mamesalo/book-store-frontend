import { useState, useEffect } from "react";
import BackButton from "../component/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../global";
import { useSnackbar } from "notistack";
import React from "react";

const EditBook = () => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [publishYear, setpublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  console.log(title);
  console.log(author);
  console.log(publishYear);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        settitle(response.data.title);
        setauthor(response.data.author);
        setpublishYear(response.data.publishYear);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .put(`${SERVER_URL}/book/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("book updated successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5">
      {/* Back Button Outside the Box */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card for Form */}
      <div className="card">
        <div className="card-body">
          <h1 className="mb-4 text-center">Edit Book</h1>
          <form>
            {/* Title Input */}
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="title"
                className="col-sm-2 col-form-label text-end"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
              </div>
            </div>

            {/* Author Input */}
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="author"
                className="col-sm-2 col-form-label text-end"
              >
                Author
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setauthor(e.target.value)}
                />
              </div>
            </div>

            {/* Publish Year Input */}
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="publishYear"
                className="col-sm-2 col-form-label text-end"
              >
                Publish Year
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  id="publishYear"
                  className="form-control"
                  placeholder="Enter publish year"
                  value={publishYear}
                  onChange={(e) => setpublishYear(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleEditBook}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
