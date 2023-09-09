import * as React from "react"

const ImSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26.5 26.5"
    width={26}
    height={26}
  >
    <circle
      cx={11.25}
      cy={11.25}
      r={10.5}
      style={{
        fill: "none",
        stroke: "#1e4b6a",
        strokeWidth: "1.5px",
        strokeMiterlimit: 10,
      }}
    />
    <path
      style={{
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none",
        stroke: "#1e4b6a",
        strokeWidth: "1.5px",
      }}
      d="m25.75 25.75-7.08-7.07"
    />
  </svg>
)

export default ImSearch
