"use client";

import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <Circles
      height='80'
      width='80'
      color='#7D7C7C'
      ariaLabel='circles-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  );
};

export default Loader;
