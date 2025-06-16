import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as SoundIcon } from "../../../assets/img/mobile/winners.svg";

const CongratulationBanner = ({ messagesObject }) => {
  const allMessages = Object.values(messagesObject || {}).flat();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (allMessages.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % allMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allMessages]);

  if (!allMessages.length) return null;

  // console.log("Messages:", allMessages);

  return (
    <div className="congrats-banner">
      <SoundIcon className="banner-icon" />
      <div className="message-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="animated-message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {allMessages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CongratulationBanner;
