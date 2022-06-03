import axios from "axios";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const fetchBatchedData = async () => {
    const arr = new Array(20).fill(0);

    await arr.reduce(async (memo, _, index) => {
      await memo;
      const numbers = await Promise.allSettled(
        new Array(5).fill(0).map((_, i) =>
          axios
            .get(
              "https://jsonplaceholder.typicode.com/posts/" +
                (index * 5 + (i + 1))
            )
            .then((res) => {
              return res.data.id;
            })
        )
      );
      const ids = numbers.map((n) => n.value);
      // console.log(index, ids);
      setData((prev) => [...prev, ...ids]);
    }, undefined);
  };
  // console.log(data);
  return (
    <div className="App">
      <button
        className="button"
        onClick={() => fetchBatchedData()}
        disabled={data.length > 0}>
        Click to start fetching
      </button>
      {data.map((element) => {
        return <h1 key={element}>{element}</h1>;
      })}
    </div>
  );
}
