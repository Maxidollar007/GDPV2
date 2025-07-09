import { motion } from "motion/react"
import { useState,useEffect } from "react"
import { Taux } from "./taux"
import { format } from "date-fns"


export function Historique(){

//Utilitaire personnalisé

    const input="my-2 px-6 py-1 border-2 rounded hover:border-blue-500"
    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const select ="my-2 px-4 py-1 rounded bg-blue-500 text-white shadow-xl "
    
    const d=new Date ()
    
//Utilisation des hooks notamment le useState
        const [stagiaires,setStagiaires]=useState([])
        const [histostagia,setHistostagia]=useState([])
        const [date1,setDate1]=useState('')
        const [date2,setDate2]=useState('')
        const [search,setSearch]=useState(false)
        const [name,setName]=useState('')

//Chargement des data
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
    const filterdev=stagiaires.filter(f=>f.formation=='Developpement Logiciel')
    const filtermar=stagiaires.filter(f=>f.formation=='Marketing Digital')

//Controle des champs controllés
    const handleChangeD1=(e)=>{
        setDate1(e.target.value)
    }
     const handleChangeD2=(e)=>{
        setDate2(e.target.value)
    }

    const handleChangeName=(e)=>{
        setName(e.target.value)
    }
    

   

//Forcer le format de date en utilisatnt date fns 
  /*   const formatted=format(date,'dd/MM/yyyy') */

      /*   const searchname=histostagia.filter(h=>{
            if(h.date===formatted){
                if(!h){
                    alert("Aucun resultat")
                }else{
                    return h
                }
            }
        })
  */


/*         const searchmonth=histostagia.filter(search=>{
                    if(datemonthsjson.find(datemonthsuser)){
                        return search
                    }
                }) */

    

                const affichersearch=histostagia.filter(searchfilter=>{
                    if(searchfilter.date.split('/')[1]>=parseInt(date1) && searchfilter.date.split('/')[1]<=parseInt(date1) && searchfilter.nom.toLowerCase().includes(name.toLowerCase())  ){
                        return searchfilter
                    }
                  })

                  var present 
                  var absent

                  if(affichersearch.length!==0){
                        present=affichersearch.filter(present=>present.statut=='Présent')
                        absent=affichersearch.filter(present=>present.statut=='absent(e)')
                  }
                  
                  
        
      /*   var result_final

                  if(affichersearch.length!==0){
                    result_final=affichersearch
                  }else{
                    console.log(("Log de Zero "));
                  } */

                    
                  
                

//Trouver le nombre de personne absente et presente

       /*  const present=searchmonth.filter(s=>s.statut==='Présent')
        const absent=searchmonth.filter(s=>s.statut==='absent(e)')*/

        /*const total=present.length+absent.length;  */

// Tache 1 : Nombre total de developpeur
//Tache 2 : Nombre total de Marketiste 
// Tache 3 : Effectuer une useEffect pour gérer les changements     


    
    return <>
        <div className="w-[80%] m-auto flex justify-evenly items-center my-4 text-white">
            <div className=" items-center">
                 <label htmlFor="name" className="mx-5">Nom :</label> 
                 <input type="text" name="name" id="name" className={input} value={name} onChange={handleChangeName} />
                 <label htmlFor="months" className="mx-5">Du :</label> 
                 <select name="months1" id="months1" className={select} value={date1} onChange={handleChangeD1}>
                    <option value=""> X... </option>
                    <option value="1">Janvier {d.getFullYear()} </option>
                    <option value="2">Fevrier {d.getFullYear()}</option>
                    <option value="3">Mars {d.getFullYear()}</option>
                    <option value="4">Avril {d.getFullYear()}</option>
                    <option value="5">Mai {d.getFullYear()}</option>
                    <option value="6">Juin  {d.getFullYear()}</option>
                    <option value="7">Juillet {d.getFullYear()}</option>
                    <option value="8">Août {d.getFullYear()}</option>
                    <option value="9">Septembre {d.getFullYear()}</option>
                    <option value="10">Octobre {d.getFullYear()}</option>
                    <option value="11">Novembre {d.getFullYear()}</option>
                    <option value="12">Décembre {d.getFullYear()}</option>
                 </select>

                 <label htmlFor="months2" className="mx-5">Au :</label> 
                 <select name="months2" id="months2"  onChange={handleChangeD2} className="my-2 px-4 py-1 rounded bg-purple-500 text-white shadow-xl  ">
                     <option value="">Y... </option>
                    <option value="1">Janvier {d.getFullYear()} </option>
                    <option value="2">Fevrier {d.getFullYear()}</option>
                    <option value="3">Mars {d.getFullYear()}</option>
                    <option value="4">Avril {d.getFullYear()}</option>
                    <option value="5">Mai {d.getFullYear()}</option>
                    <option value="6">Juin  {d.getFullYear()}</option>
                    <option value="7">Juillet {d.getFullYear()}</option>
                    <option value="8">Août {d.getFullYear()}</option>
                    <option value="9">Septembre {d.getFullYear()}</option>
                    <option value="10">Octobre {d.getFullYear()}</option>
                    <option value="11">Novembre {d.getFullYear()}</option>
                    <option value="12">Décembre {d.getFullYear()}</option>
                 </select>
            </div>
          
        </div>
        <div className="w-[80%] flex justify-around items-center mx-auto my-8 text-white ">
            <div className="flex w-fit  border-white shrink-1 items-center">
                <div className="w-1/2 items-center">
                    <Taux number={filterdev.length} presence='Developpement Logiciel'  />
                </div>
            </div>

            <div className="flex w-fit  border-white shrink-1 items-center">
                <div className="w-1/2 items-center">
                    <Taux number={filtermar.length} presence='Marketing Digital'  />
                </div>
            </div>
            <div className="flex w-fit  border-white shrink-1">
                <div className="w-1/2 items-center">
                    <Taux number={filterdev.length + filtermar.length} presence='Nombre Total'  />
                </div>
            </div>
        </div>

        {affichersearch.length!==0 ? (<motion.div className="m-auto bg-gray-800 w-[80%] p-4 text-white" 
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
                    <th  className="border-b-1 border-gray-400 py-4">Motif</th>
                </tr>
            {histostagia && affichersearch.map((s,index)=>(
                <tr key={index} className="hover:bg-gray-700 transition-all duration-300">
                    <td className="border-b-1 border-gray-400 py-4"> {s.date} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.nom} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.prenom} </td>
                    <td className= {`${s.statut==="Présent"? 'text-green-400 ' : 'text-red-400 '}`}> {s.statut} </td>
                    <td className="border-b-1 border-gray-400 py-4"> {s.heure_darrivee} </td>
                    <td> {s.motif} </td>
                </tr>
            ))}
            </thead>
        </table>
            <div className="m-auto bg-gray-800 w-[80%] p-4 text-white flex justify-around ">

                <div className="py-4 text-2xl">
                    Presence: {present.length}
                </div>
                <div className="py-4 text-2xl">
                    Absence : {absent.length}
                </div>
            </div> 
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
                    <th  className="border-b-1 border-gray-400 py-4">Motif</th>
                </tr>
            {histostagia && histostagia.map((h,index)=>(
                <tr key={index} className="hover:bg-gray-700 transition-all duration-300">
                    <td className="border-b-1 "> {h.date} </td>
                    <td> {h.nom} </td>
                    <td className="border-b-1 "> {h.prenom} </td>
                    <td className= {`${h.statut==="Présent"? 'text-green-400 ' : 'text-red-400 '}`}> {h.statut} </td>
                    <td className="border-b-1  py-4"> {h.heure_darrivee} </td>
                    <td> {h.motif} </td>
                </tr>
            ))}
            </thead>
        </table>
        </motion.div>}

       



      
    </>
}