import React from 'react'

const checkapi = () => {
  let flask_url = "http://localhost:5001/"

  const response = async (service_url) => {
    let response = await fetch(service_url, {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data)
  }

  return (
    <div>
      <button onClick={() => response(flask_url)}>Send request to Flask</button>
    </div>
  )
}

export default checkapi