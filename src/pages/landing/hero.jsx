import { motion } from "motion/react"
import { Link } from "react-router-dom"
export function Hero(){
    const button="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 hover:cursor-pointer"
    return <>
        <motion.div className="text-white h-[70%] flex items-center justify-between w-full maxi"
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:2,delay:0.5}}>
            <div className="w-[40%] flex  flex-col p-4 m-auto flex-wrap ">
                <motion.h2 className="text-5xl mt-10 "
                initial={{scale:0.9,opacity:0}}
                animate={{scale:1,opacity:1}}
                transition={{duration:1.2,delay:1.3}}
        >Optimisez la gestion de presence  avec une solution numérique perfomante</motion.h2>
                <div className="my-4 text-2xl">
                    Cette application vous offre une interface intuitive pour enregistrer , suive et analyser les presences de vos
                    stagiaires.Gagnez en fiabilité et efficacité grâce à <span>StagiaTrack</span>
                </div>
                <Link to={'/Enregistrement'} align="center" className=" my-8 m-auto flex-wrap"> <button type="button" className=" m-auto px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 hover:cursor-pointer"  >Commencer dès maintenant</button></Link>
            </div>
            <div className="bg-[url('assets/people-working-together-animation-studio~1.webp')] bg-cover bg-center rounded w-[45%] h-full mx-auto mt-8">

            </div>

        </motion.div>
        
        

    </>
}