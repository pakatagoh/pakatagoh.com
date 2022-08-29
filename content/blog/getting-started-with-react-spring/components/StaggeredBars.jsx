import React, { useState } from "react"
import { useTrail, animated } from "react-spring"

const colors = ["red", "green", "blue", "orange", "purple", "yellow"]

const StaggeredBars = () => {
  const [expanded, setExpanded] = useState(true)
  const trailSprings = useTrail(colors.length, {
    from: { height: expanded ? "80px" : "5px" },
    to: { height: expanded ? "5px" : "80px" },
  })

  return (
    <div className="mb-3 border border-black p-3 dark:border-white">
      <div className="mb-4 flex h-[100px] items-end">
        {trailSprings.map((spring, index) => (
          <animated.div
            key={colors[index]}
            style={{
              ...spring,
              width: "20px",
              marginRight: "10px",
              transformOrigin: "bottom",
              backgroundColor: colors[index],
            }}
          />
        ))}
      </div>
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

export default StaggeredBars
