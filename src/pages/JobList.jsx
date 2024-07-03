import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JobList = ({ retry }) => {
  const { isLoading, error, jobs } = useSelector((state) => state);

  return (
    <div>
      <Filter />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} retry={retry} />
      ) : (
        <div className="card-wrapper">
          {jobs.map((item) => (
            <Card key={item.id} job={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
