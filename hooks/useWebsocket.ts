import { useState } from "react";

const useWebsocket = (url: string) => {
  const ws = new WebSocket(url);
  const [data, setData] = useState(null);

  ws.onopen = () => {
    console.log("connected");
  };

  ws.onmessage = (e) => {
    setData(e.data);
  };

  ws.onerror = (e) => {
    console.log(e);
  };

  ws.onclose = (e) => {
    console.log(e.code, e.reason);
  };

  const sendWSMessage = (message: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return { data, sendWSMessage };
};

export default useWebsocket;
