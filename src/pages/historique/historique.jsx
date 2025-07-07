import { motion } from "motion/react"
import { useState,useEffect } from "react"
import { Taux } from "./taux"
import { format } from "date-fns"


export function Historique(){
    const input="my-2 px-6 py-1 border-2 rounded hover:border-blue-500"
    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const d=new Date ()
    

        const [stagiaires,setStagiaires]=useState([])
        const [histostagia,setHistostagia]=useState([])
        const [date,setDate]=useState('07/07/2025')
        const [search,setSearch]=useState(false)
    useEffect(()=>{
        fetch('http://localhost:3302/historique')
        .then(response=>response.json())
        .then(stati=>setHistostagia(stati))
    },[])

    useEffect(()=>{
        fetch('http://localhost:3302/stagiaires')
        .then(response=>response.json())
        .then(histo=>setStagiaires(histo))
    },[])

//Nombre Total de stagiaires
    const filterdev=stagiaires.filter(f=>f.formation=='Developpement logiciel')
    const filtermar=stagiaires.filter(f=>f.formation=='Marketing Digital')

//
    const handleChange=(e)=>{
        setDate(e.target.value)
    }
    const formatted=format(date,'dd/MM/yyyy')
    
    

        const searchname=histostagia.filter(h=>{
            if(h.date===formatted){
                if(!h){
                    alert("Aucun resultat")
                }else{
                    return h
                }
            }
        })
        const present=searchname.filter(s=>s.statut==='Présent')
        const absent=searchname.filter(s=>s.statut==='absent(e)')
        

        const handlesearch=()=>{
            setSearch(!search)
        }
   
    
    return <>
        <div className="w-[80%] m-auto flex justify-evenly items-center my-4 text-white">
            <div className=" items-center">
                <label htmlFor="filtre" className="mx-10">Filtres :</label> <input type="date" name="filtre" id="filtre" className={input} value={date} onChange={handleChange} />
            </div>
            {search ? <span className="px-4 py-2 bg-red-500 mt-4 rounded hover:bg-red-700 hover:cursor-pointer"onClick={handlesearch}>Annuler</span> : <button type="button" className={button} onClick={handlesearch}>Rechercher</button>}
        </div>
        <div className="w-[80%] grid grid-cols-4 gap-50 items-center m-auto my-8 text-white ">
            <div className="flex w-fit  border-white shrink-1">
                <div className="w-1/2">
                    <Taux number={filterdev.length} presence='Developpement Logiciel'  />
                </div>
                <div className="w-1/2">
                    <Taux number={filtermar.length} presence='Marketing Digital' />
                </div>
            </div>

            <div>
                <Taux number={present.length} presence='presences' date={formatted}/>
            </div>
            <div>
                <Taux number={absent.length} presence='Absence' date={formatted}/>
            </div>
            <div>
                <Taux number={present.length*100/(filterdev.length+filtermar.length)} presence='%' date={formatted}/>
            </div>
        </div>

        {search ? (<motion.div className="m-auto bg-gray-800 w-[80%] p-4 text-white" 
                    initial={{opacity:0,y:50}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:2,delay:0.5}}
                >
            <table className="text-center w-full rounded-xl my-5">
            <thead>
                <tr className="bg-gray-600 rounded my-4">
                    <th  className="border-b-1 border-gray-400 py-4">Date</th>
                    <th  className="border-b-1 border-gray-400 py-4">Nom</th>
                    <th  className="border-b-1 border-gray-400 py-4">Prenom</th>
                    <th  className="border-b-1 border-gray-400 py-4">Statut</th>
                    <th  className="border-b-1 border-gray-400 py-4">Heure d'arrivée</th>
                </tr>
            {histostagia && searchname.map((s,index)=>(
                <tr key={index} className="hover:bg-gray-700 transition-all duration-300">
                    <td className="border-b-1 border-gray-400 py-4"> {s.date} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.nom} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.prenom} </td>
                    <td className= {`border-b-1 border-gray-400 ${s.statut==="Présent"? 'bg-green-400 rounded-xl' : 'bg-red-400 rounded-xl'}`}> {s.statut} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.heure_darrivee} </td>
                </tr>
            ))}
            </thead>
        </table>
        </motion.div>) :   <motion.div className="m-auto bg-gray-800 w-[80%] rounded p-4 text-white" 
                            initial={{opacity:0,y:50}}
                            animate={{opacity:1,y:0}}
                            transition={{duration:2,delay:0.5}}
        >
            <table className="text-center w-full rounded-xl my-5">
            <thead>
                <tr className="bg-gray-600 rounded my-4">
                    <th  className="border-b-1 border-gray-400 py-4">Date</th>
                    <th  className="border-b-1 border-gray-400 py-4">Nom</th>
                    <th  className="border-b-1 border-gray-400 py-4">Prenom</th>
                    <th  className="border-b-1 border-gray-400 py-4">Statut</th>
                    <th  className="border-b-1 border-gray-400 py-4">Heure d'arrivée</th>
                </tr>
            {histostagia && histostagia.map((h,index)=>(
                <tr key={index} className="hover:bg-gray-700 transition-all duration-300">
                    <td className="border-b-1 "> {h.date} </td>
                    <td> {h.nom} </td>
                    <td className="border-b-1 "> {h.prenom} </td>
                    <td className= {`${h.statut==="Présent"? 'text-green-600 rounded-xl' : 'text-red-400 rounded-xl'}`}> {h.statut} </td>
                    <td className="border-b-1  py-4"> {h.heure_darrivee} </td>
                </tr>
            ))}
            </thead>
        </table>
        </motion.div>}



      
    </>
}