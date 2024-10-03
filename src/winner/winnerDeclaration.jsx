import "./winner.css"
import {AnimatePresence, motion} from "framer-motion"
const Winner = ({winner}) => {

    return ( 
        <AnimatePresence>
            {winner && <motion.div
            initial={{y:-500}}
            animate={{y:0}}
            exit={{y:-500}}
            transition={{type:"just"}}
            className="winner">
                <h2>{winner == "Draw" ? "Draw":"Winner"}</h2>
                <p>{winner == "Draw" ?"" :winner}</p>
            </motion.div>}
        </AnimatePresence>
     );
}
 
export default Winner;