import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../component/BookTable";
import { SERVER_URL } from "../global";
const Home = () => {
  const [books, setbooks] = useState([]);

  const navagiate = useNavigate();
  const usernamelocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (usernamelocal == null) {
    navagiate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navagiate("/");
  };
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {
        setbooks(Response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mt-5">Book List</h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="display-5" />
        </Link>
        <span className="mx-2">Welcom, {usernamelocal}!</span>
        <button className="btn btn-primary my-3" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <BookTable books={books} />
    </div>
  );
};
export default Home;
