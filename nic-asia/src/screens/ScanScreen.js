import React from "react";
import QRCode from "react-qr-code";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from "react";
import { Box, Button, Card, CardBody, Center, Container, Divider, Grid, GridItem, Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReactComponent as PhotoSVG } from '../assets/svg/photo.svg';
import { ReactComponent as FullnameSVG } from '../assets/svg/fullname.svg';
import { ReactComponent as MobileSVG } from '../assets/svg/mobile.svg';
import { ReactComponent as CitizenshipSVG } from '../assets/svg/citizenship.svg';
import { RepeatIcon } from "@chakra-ui/icons";
import QRLoader from "./QRLoader";
import ReceivedDetails from "./ReceivedDetails";

const SOCKET_URL = 'ws://65.109.161.97:8000/ws/qr/request/';
// const SOCKET_URL = 'ws://localhost:8000/ws/5235/';

export default function ScanScreen() {
  const [requestedData, setRequestedData] = useState(null);
  return (
    <>
      {requestedData ?
        <ReceivedDetails requestedData={requestedData} />
        :
        <QRLoader setRequestedData={setRequestedData} />
      }
    </>
  );
}
