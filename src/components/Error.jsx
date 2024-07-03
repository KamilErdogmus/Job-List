const Error = ({ message, retry }) => {
  return (
    <div className="error">
      <p>Something went wrong</p>
      <p className="text">{message}</p>
      <button onClick={retry} className="button">
        <span>Retry</span>
      </button>
    </div>
  );
};

export default Error;
