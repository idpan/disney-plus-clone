import React, { useState, useEffect } from "react";
import Row from "../components/ui/Row/Row";
import requests from "../../requests";
import { register } from "swiper/element";

register();
function SandBox() {
  return (
    <Row
      title="#AwayFromKerjaan"
      fetchUrl={requests.home.getAnimeSeries}
      mediaType="tv"
    ></Row>
  );
}

export default SandBox;
