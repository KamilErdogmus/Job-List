import { v4 as uuid } from "uuid";
import Button from "../components/Button";
import Select from "../components/Select";
import { statusOption, typeOf } from "../constants";
import AutoInput from "../components/AutoInput";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createJobs, setError } from "../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    newJobData.id = uuid();
    newJobData.date = Date.now();

    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("Job Added Successfully");
        dispatch(createJobs(newJobData));
        navigate("/");
      })
      .catch((err) => {
        dispatch(setError(err.message)), toast.error("Something went wrong!!");
      });
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <AutoInput label="Position" name="position" />
          <AutoInput label="Company" name="company" />
          <AutoInput label="Location" name="location" />
          <Select name="status" label="Status" options={statusOption} />
          <Select name="type" label="Type" options={typeOf} />
          <Button name="Add" />
        </form>
      </section>
    </div>
  );
};

export default AddJob;
