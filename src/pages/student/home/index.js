import Api from "@/utils/api";
import NetworkApi from "@/utils/axios";
import { useState, useEffect } from "react";
import { Axios } from "axios";

function Home() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    NetworkApi.get("/api/category/get")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <ul>
        {Data.map((cat) => {
          return (
            <div>
              <h1>student home</h1>
              <li className="my-1" key={cat.id}>
                {cat.category_name}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
export default Home;
