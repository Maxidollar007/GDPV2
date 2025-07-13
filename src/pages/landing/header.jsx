import { motion } from "motion/react"
import { Link } from "react-router-dom"
export function Header(){
    return<>
        <motion.div className="flex items-center justify-between p-4 shadow-xl maxi "
        initial={{y:-60,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.8,ease:"easeOut"}}
        >
            <h1 className="text-white text-2xl m-auto  ">StagiaTrack</h1>
           <nav className="flex gap-10 text-white w-fit m-auto ">
            <Link to={'/'} className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000">Acceuil</Link>
            <Link to={'/Presence'} className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000 ">Présence</Link>
            <Link to={'/Historique'}  className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000">Historique</Link>
            <div className="flex items-center " >
                <Link to={'/Enregistrement'}><button type="button" className="px-4 py-2  bg-purple-600 rounded hover:bg-purple-800 hover:cursor-pointer "  >Ajouter un stagiaire</button></Link>
            </div>
           </nav>
        </motion.div>
    </>
}