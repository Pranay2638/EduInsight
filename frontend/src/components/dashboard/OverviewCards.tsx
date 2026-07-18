import StatsCard from "./StatsCard";
import { dashboardCards } from "@/constants/dashboardCards";
import { motion } from "framer-motion";

export default function OverviewCards({
  overview,
}: any) {

  if (!overview) return null;

  return (
    <motion.div

     initial={{
        opacity:0,
        y:20
      }}

     animate={{
       opacity:1,
       y:0
      }}

     transition={{
       staggerChildren:0.1
      }}>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  {dashboardCards.map((card) => (

    <StatsCard
      key={card.key}
      title={card.title}
      value={
        `${overview[card.key]}${card.suffix}`
      }
      icon={card.icon}
      color={card.color}
      trend={card.trend}
    />

  ))}

  </div> 
  </motion.div>
  );
}