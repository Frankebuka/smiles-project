import React, { useState } from "react";
import BarChart from "./BarChart";
import { UserData } from "./Data";
import LineChart from "./LineChart";
// import PieChart from "./PieChart";

const Analytics = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#F3BA2F",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [userDatas, setUserDatas] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Lost",
        data: UserData.map((data) => data.userLost),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#F3BA2F",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      <div style={{ width: 700, marginTop: 20 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 700, marginTop: 20 }}>
        <LineChart chartData={userDatas} />
      </div>
      {/* <div style={{ width: 700, marginTop: 20 }}>
        <PieChart chartData={userDatas} />
      </div> */}
    </div>
  );
};

export default Analytics;
