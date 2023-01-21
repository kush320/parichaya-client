import React from "react";
import "./ScanScreen.css";
import QRCode from "react-qr-code";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from "react";

const styles = {
  root: {
    fontFamily: "sans-serif",
  },
  h1: {
    textAlign: "center",
  },
  qrcode: {
    textAlign: "center",
  },
};
const SOCKET_URL = 'ws://localhost:8000/ws/scan_request/';

export default function ScanScreen() {

  const [qrData, setQRData] = useState(null);
  const [requestedData, setRequestedData] = useState(null);
  const [error, setError] = useState(null);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(SOCKET_URL, {

    onMessage: (msg) => {
      console.log(msg)
      const message = JSON.parse(msg.data)
      console.log(message)
      if (message.type === 'connection.accepted') {
        console.log(message.request_id)
        // setQRData({ requestId: message.request_id })
        setQRData(message.request_id)
        fetch('http://localhost:8000/api/v1/scan-request/', {
          method: 'POST',
          body: JSON.stringify(
            {
              request_id: message.request_id,
              requester: "NIC Asia",
              requested_fields: ["NID_NIN", "NID_first_name", "NID_dob"]
            }
          ),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Handle data
          })
          .catch((err) => {
            console.log(err.message);
          });





      }
      if (message.type === 'request.approved') {
        setRequestedData(message.data)
        console.log(setRequestedData)
      }
      if (message.type === 'request.rejected') {
        setError("Scan request was rejected.")
        console.log(message.message)
      }
    },
    onOpen: () => {
      console.log(lastMessage);
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });
  return (
    <>
      <div className="wrapper2">
        <center>
          <img src="Nic.png" style={{ width: 150, height: 150 }} alt="Nic" />
        </center>
        {error && JSON.stringify(error)}
        <form className="p-3 mt-3">

          {!requestedData &&
            <div>

              <div style={styles.root}>
                <div style={styles.qrcode}>
                  {
                    qrData &&
                    <QRCode
                      level="Q"
                      style={{ width: 150, height: 150 }}
                      value={qrData}
                    />
                  }
                  {!qrData && <div >Loading your QR...</div>}
                </div>
              </div>

              <center>
                <div className="text">
                  <p>Scan the QR code with Parichaya App to continue </p>
                </div>
              </center>
              <div>

                <center>
                  <div className="text" style={{ color: "blue" }}>
                    <p>You will allow Nic Asia Bank to access your:</p>
                  </div>
                </center>
                <center>
                  <div className="text-center" style={{ color: "blue" }}>
                    Name
                  </div>
                </center>
                <center>
                  <div className="text-center" style={{ color: "blue" }}>
                    Mobile
                  </div>
                </center>
                <center>
                  <div className="text-center" style={{ color: "blue" }}>
                    CitizenshipNumber
                  </div>
                </center>
              </div>
            </div>}

          {requestedData !== null &&
            <div style={{ margin: 20 }}>
              {
                Object.entries(requestedData).map((item) => {
                  // console.log(Object.keys(requestedData).map)
                  console.log(item)
                  return (
                    <div>
                      {item[0]}: {item[1]}                       {/* {value}: {value} */}
                    </div>
                  )

                }
                )
              }
              <button className="btn">
                Proceed
              </button>
            </div>}
        </form>
      </div>
    </>
  );
}
