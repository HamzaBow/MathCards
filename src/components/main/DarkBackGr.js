import React from "react";
const DarkBackGr = ({ setShowAll }) => {
  const hideMainCard = () => {
    setShowAll(true);
    document.getElementById("new-card-form").style =
      "visibility: hidden; opacity: 0;";
    document.getElementById("opened-card").style =
      "visibility: hidden; opacity: 0;";
    document.getElementById("dark-backgr").style =
      "visibility: hidden; opacity: 0;";
  };
  return <div id="dark-backgr" onClick={() => hideMainCard()}></div>;
};

export default DarkBackGr;
