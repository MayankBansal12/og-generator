import { useEffect, useState } from "react";
import Post from "./components/Post";
const backend = process.env.REACT_APP_BACKEND

function App() {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)
    fetch(backend, {
      method: 'GET'
    }).then(() => {
      setShowLoader(false)
    })
  }, [])

  return (
    <div>
      {
        !showLoader ? <Post />
          : <div className="loading-popup">
            <h2>You need to wait for a min...</h2>
            <p>Server is deployed on render, need to make sure, it is running...please wait</p>
            <p>sorry for bad user experience</p>
          </div>
      }
    </div>
  );
}

export default App;
