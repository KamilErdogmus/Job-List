import Select from "./Select";
import { sortOption, statusOption, typeOf } from "./../constants/index";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import api from "../utils/api";

const Filter = () => {
  const dispatch = useDispatch("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  //! Debounce
  useEffect(() => {
    //* text yoksa bırak
    if (text === undefined) return;
    //*Bir sayaç başlat ve işlemi sayaç durunca yap
    const timer = setTimeout(() => setDebouncedText(text), 1000);
    //* Süre bitmeden useEffect çalışırsa(yeni sayaç başlaması) önceki sayacı iptal et
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  const handleReset = (e) => {
    e.preventDefault();
    //* Stateleri sıfırla
    setText();
    setStatus();
    setType();
    setSort();
    setDebouncedText("");
    //*İnput sıfırla
    e.target.reset();
  };

  //* Filtreleme ve sıralama ile ilgili bir state değiştiğinde api'den güncel verilieri al
  useEffect(() => {
    const sortParams =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "Latest" || sort === "Oldest"
        ? "date"
        : undefined;

    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "Latest"
        ? "desc"
        : sort === "Oldest"
        ? "asc"
        : undefined;

    const params = {
      q: debouncedText || undefined,
      _sort: sortParams,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };

    console.log("Fetching jobs with params:", params); // Debug log

    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => {
        console.log("API response:", res.data); // Debug log
        dispatch(setJobs(res.data));
      })
      .catch((err) => {
        console.error("API error:", err);
        dispatch(setError(err.message));
      });
  }, [debouncedText, type, status, sort]);

  return (
    <div className="filter-sec">
      <h2>Filter Job</h2>
      <form onSubmit={handleReset}>
        <div>
          <label>Search</label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <Select
          label="Status"
          options={statusOption}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Type"
          options={typeOf}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label="Sorting"
          options={sortOption}
          handleChange={(e) => setSort(e.target.value)}
        />

        <Button name="Reset" />
      </form>
    </div>
  );
};

export default Filter;
