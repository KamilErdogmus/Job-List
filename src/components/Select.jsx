const Select = ({ label, options, name, handleChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select defaultValue={""} name={name} onChange={handleChange}>
        <option value="" key="">
          Choose
        </option>
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
