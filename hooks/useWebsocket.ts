import { useState } from "react";

const useWebsocket = (url: string) => {
  const ws = new WebSocket(url);
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  ws.onopen = () => {
    setIsConnected(true);
  };

  ws.onmessage = (e) => {
    setData(e.data);
  };

  ws.onerror = (e) => {
    console.error(e);
  };

  ws.onclose = (e) => {
    // console.log(e.code, e.reason);
    setIsConnected(false);
  };

  const sendWSMessage = (message: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return { isConnected, data, sendWSMessage };
};

export default useWebsocket;
