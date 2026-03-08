import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

const SparkContainer = () => {
  const { mistakes } = useStore();
  const [elements, setElements] = useState({ sparks: [], smoke: null });

  useEffect(() => {
    if (mistakes > 0) {
      const randomX = Math.floor(Math.random() * 80) + 10;
      const randomY = Math.floor(Math.random() * 60) + 20;

      const newSparks = Array.from({ length: 10 }).map(() => ({
        id: Math.random(),
        dx: (Math.random() - 0.5) * 250,
        dy: (Math.random() - 0.5) * 250,
        size: Math.random() * 3 + 1,
      }));

      // cloud and zap
      setElements({
        sparks: newSparks,
        smoke: { id: Math.random(), x: randomX, y: randomY },
      });

      const timer = setTimeout(() => {
        setElements({ sparks: [], smoke: null });
      }, 1200); 

      return () => clearTimeout(timer);
    }
  }, [mistakes]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
 
      {elements.smoke && (
        <div
          className="smoke-cloud w-14 h-14"
          style={{
            left: `${elements.smoke.x}%`,
            top: `${elements.smoke.y}%`,
          }}
        />
      )}

    
      {elements.sparks.map((s) => (
        <div
          key={s.id}
          className="spark spark-orange"
          style={{
            position: "absolute",
            left: `${elements.smoke?.x}%`,
            top: `${elements.smoke?.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--dx": `${s.dx}px`,
            "--dy": `${s.dy}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkContainer;
