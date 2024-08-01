import React, { useState } from "react"
import { Spin } from "antd"
import "./index.less"
const Loading = () => {
  const [spinning, setSpinning] = useState(true)
  return (
    <Spin
      spinning={spinning}
      percent="auto"
      tip="加载资源中..."
      fullscreen
    ></Spin>
  )
}
export default Loading
