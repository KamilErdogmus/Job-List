const Button = ({ name }) => {
  return (
    <div>
      <button className="btn">
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span>{name}</span>
      </button>
    </div>
  );
};

export default Button;
