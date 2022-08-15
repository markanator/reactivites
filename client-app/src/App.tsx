import { useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import { useGetAllActivities } from "../async/rq/activities";

function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading } = useGetAllActivities();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="App">
      <ul>
        {data?.map((el: any) => (
          <li key={el?.id}>{el?.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
