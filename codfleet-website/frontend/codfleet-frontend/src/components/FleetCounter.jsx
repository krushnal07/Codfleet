import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FleetCounter = ({ targetCount = 50, label = "Freelancers Verified" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetCount);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetCount]);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl md:text-8xl font-bold mb-4">
            {count.toLocaleString()}
          </div>
          <div className="text-xl md:text-2xl font-medium mb-2">
            {label}
          </div>
          <div className="text-red-200">
            Growing every day—compliance-secure
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FleetCounter;

