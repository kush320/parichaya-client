import React from "react";
import "./Scan.css";
import QRCode from "react-qr-code";
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

export default function Scan() {
  return (
    <>
      <div className="wrapper2">
        <center>
          <img src="Nic.png" style={{ width: 150, height: 150 }} alt="Nic" />
        </center>
        <form className="p-3 mt-3">
          <div style={styles.root}>
            <div style={styles.qrcode}>
              <QRCode
                level="Q"
                style={{ width: 150, height: 150 }}
                value={JSON.stringify({
                  sessionId: 928328,
                  requestedFields: [
                    "name",
                    "mobile",
                    "image",
                    "gender",
                    "dob",
                    "citizenshipNumber",
                  ],
                })}
              />
            </div>
          </div>
          <center>
            <div className="text">
              <p>Scan the QR code with Parichaya App to continue </p>
            </div>
          </center>
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
        </form>
      </div>
    </>
  );
}
