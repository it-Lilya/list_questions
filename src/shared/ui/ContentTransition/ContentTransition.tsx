import type { ReactNode, FC } from "react";

import { motion, AnimatePresence } from "framer-motion";

interface ContentTransitionProps {
  children: ReactNode;
  keyProp: string | number;
}

const ContentTransition: FC<ContentTransitionProps> = ({
  children,
  keyProp,
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default ContentTransition;