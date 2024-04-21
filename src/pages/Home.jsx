import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivatDate, data) => {
  const beginTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth(), 1, 0, 0, 0).getTime(); // 1일 0시 0분 0초, getTime() 이용하여 숫자값으로 저장
  const endTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 0일 즉 이전 달 마지막 날 59분 59초

  return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
};

export default function Home() {
  const data = useContext(DiaryStateContext);
  const [pivatDate, setPivatDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivatDate, data);

  const onIncreaseMonth = () => {
    setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivatDate.getFullYear()}년 ${pivatDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
}
