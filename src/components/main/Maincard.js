const Maincard = ({ frontIsShown, setFrontIsShown }) => {
  const flipCard = () => {
    if (frontIsShown == true) {
      document.getElementById("opened-card").childNodes[0].style =
        "transform: rotateY(180deg);";
      setFrontIsShown(false);
    } else {
      document.getElementById("opened-card").childNodes[0].style =
        "transform: rotateY(0deg);";
      setFrontIsShown(true);
    }
  };

  return (
    <>
      <div
        id="opened-card"
        className="container-item"
        onClick={() => flipCard()}
      ></div>
    </>
  );
};

export default Maincard;
