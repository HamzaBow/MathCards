const Maincard = ({ flipMainCard }) => {
  return (
    //*******************************  Delete this tag ******************************/
    <>
      <div
        id="opened-card"
        className="container-item"
        onClick={() => flipMainCard()}
      ></div>
    </>
  );
};

export default Maincard;
