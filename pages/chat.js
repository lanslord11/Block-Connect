import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT

import { Filter, Friend } from "../Components/index";

const chat = () => {
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  );
};

export default chat;
