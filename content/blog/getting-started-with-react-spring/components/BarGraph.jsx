import React, { useState } from "react"
import { useSprings, animated } from "react-spring"

const BarGraph = () => {
  const [expanded, setExpanded] = useState(true)
  const bars = [
    {
      key: "bar1",
      color: "green",
      from: {
        width: expanded ? `100px` : "5px",
      },
      to: {
        width: expanded ? `5px` : "100px",
      },
      config: {
        mass: 20,
        clamp: expanded,
      },
    },
    {
      key: "bar2",
      color: "blue",
      from: {
        width: expanded ? `250px` : "5px",
      },
      to: {
        width: expanded ? `5px` : "250px",
      },
      config: {
        mass: 5,
        clamp: expanded,
      },
    },
    {
      key: "bar3",
      color: "red",
      from: {
        width: expanded ? `150px` : "5px",
      },
      to: {
        width: expanded ? `5px` : "150px",
      },
      config: {
        mass: 13,
        clamp: expanded,
      },
    },
  ]
  const springs = useSprings(
    bars.length,
    bars.map(({ color, key, ...config }) => config)
  )

  return (
    <div className="mb-3 border border-black p-3 dark:border-white">
      {springs.map((spring, index) => (
        <animated.div
          key={bars[index].key}
          style={{
            ...spring,
            height: "20px",
            marginBottom: "10px",
            backgroundColor: bars[index].color,
          }}
        />
      ))}
      <button
        type="button"
        onClick={() => {
          setExpanded((prevState) => !prevState)
        }}
      >
        Click to Animate
      </button>
    </div>
  )
}

export default BarGraph
