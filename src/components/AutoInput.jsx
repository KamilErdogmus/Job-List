import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);

  // * Sadece pozisyonun değerlerinden oluşan bir dizi tanımlar
  const arr = jobs.map((job) => job[name]);

  //* Dizide aynı olan elemanları kaldırır.
  const filteredSet = new Set(arr);
  //* Set ile dönderdiğimiz nesneyi diziye çevirir
  const options = Array.from(filteredSet);
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={name} required />

      <datalist id={name}>
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
