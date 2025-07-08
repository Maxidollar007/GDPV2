import { useEffect, useState } from "react"
import { tr } from "motion/react-client"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

export function Records(){

    const button="px-4 py-2 bg-blue-500  rounded hover:bg-blue-700 hover:cursor-pointer"

    const [stagiaires,setStagiaires]=useState([])
    const [histostagia,setHistostagia]=useState([])

//CHargement des fichiers Json
    useEffect(()=>{
        fetch ('http://localhost:3302/stagiaires')
        .then((response=>response.json()))
        .then((data)=>setStagiaires(data))
    },[])

//Supprimer Un stagiaires 

        const handleDelete=(id)=>{
            fetch(`http://localhost:3302/stagiaires/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            setStagiaires(stagiaires.filter((stagiaire,index)=>stagiaire.id !== id))
            
        }


//Modifier les informations d'un stagiaire

        const handleEdit=(id)=>{
            const findstagiaire=stagiaires.find(f=>f.id===id)
            console.log(findstagiaire);
            const nom=prompt("Modifier le nom",findstagiaire.nom)
            if(!nom){
                return
            }
               
            const prenom=prompt("Modifier votre prenom",findstagiaire.prenom)
            if(!prenom){
                return;
            }
                
            const formation=prompt("Modifier votre formation",findstagiaire.formation)
            if(!formation){
                return;
            }
                
            fetch(`http://localhost:3302/stagiaires/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({nom,prenom,formation})
            })
            .then(()=>stagiaires.map(s=>
                s.id===id ? {...s,nom,prenom,formation}:s
            ))
        }

//Marquer la presence des stagiaires


    const handleCheck=(index)=>{
        const d=new Date()
        const hours =d.toLocaleTimeString('Fr-fr')
        const date=d.toLocaleDateString('Fr-fr')
        
        const stagiaireconcerné=stagiaires[index]
        stagiaireconcerné['presence'][0]['statut']=true
        stagiaireconcerné['presence'][0]['heure_darrivee']=hours
        const presence=stagiaireconcerné['presence'][0]['statut'] ? "Présent" : "Absent"

        const person=({
            id:stagiaireconcerné['id'],
            nom:stagiaireconcerné['nom'],
            prenom:stagiaireconcerné['prenom'],
            statut:presence,
            heure_darrivee:hours,
            date:date
        })
        console.log(stagiaireconcerné);
        const jean=[...histostagia,person]
        setHistostagia(jean)
        fetch('http://localhost:3302/historique',{
            method:'POST',
            body:JSON.stringify(person)
        })
        
    }
    const stagiairepresence=stagiaires.filter(f=>f.presence[0].statut===false)

//Enregistrer des personnes absentes 

    var motif
        const handlevalidate=()=>{
            const d=new Date()
            const date=d.toLocaleDateString('Fr-fr')   
            if(confirm('Attention !!! Les cases non-cochées seront absents')){
                    stagiairepresence.forEach(presence=>{
                    motif=prompt('Entre le motif des absents  de '+ presence.nom+' '+presence.prenom);
                    if(motif==''){
                        const personabsent={
                        id:presence.id,
                        nom:presence.nom,
                        prenom:presence.prenom,
                        statut:"absent(e)",
                        heure_darrivee:"-",
                        date:date,
                        motif:'-'
                    }
                    fetch('http://localhost:3302/historique',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(personabsent)
                    })
                    .then(()=>{
                        window.location.reload()
                    })
                    }else{
                        const personabsent={
                        id:presence.id,
                        nom:presence.nom,
                        prenom:presence.prenom,
                        statut:"absent(e)",
                        heure_darrivee:"-",
                        date:date,
                        motif:motif
                    }
                    fetch('http://localhost:3302/historique',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(personabsent)
                    })
                    .then(()=>{
                        window.location.reload()
                    })
                    }
                    
                })  
            }else{
                return 0
            }
                   
        }

       

    return <>

    <div className="text-white flex flex-col w-full bg-gray-800">
        <motion.div className="m-auto bg-gray-800 w-[80%] p-4" 
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:2,delay:0.5}}>
            <div className="flex justify-between p-4">
                <h2 className="text-3xl font-bold">Enregistrement</h2>
                <Link to={'/Enregistrement'}><button className={button} type="button"><i class="ri-add-line"></i>Ajouter</button></Link>
            </div>
            <hr />
            <table className="text-center w-full rounded-xl my-5">
                <caption><h2 align="left" className=" text-2xl font-bold p-4 ">Gestion des stagiaires</h2></caption>
                <thead>
                    <tr className="bg-gray-600 rounded">
                        <th className="border-b-1 border-gray-400 py-4">Nom </th>
                        <th className="border-b-1 border-gray-400  py-4">Prenom </th>
                        <th className="border-b-1 border-gray-400  py-4">Formation</th>
                        <th className="border-b-1 border-gray-400  py-4">Date de fin</th>
                        <th className="border-b-1  border-gray-400 py-4">
                            Editer / Supprimer
                        </th>
                    </tr>
                {stagiaires && stagiaires.map((stagiaires,index)=>(
                    (<tr key={stagiaires.id}>
                        <td className="border-b-1 border-gray-400 py-4"> {stagiaires.nom} </td>
                        <td className="border-b-1 border-gray-400 py-4"> {stagiaires.prenom} </td>
                        <td className="border-b-1 border-gray-400 py-4"> <strong>{stagiaires.formation} </strong></td>
                        <td className="border-b-1 border-gray-400 py-4"> {stagiaires.date_de_fin} </td>
                        <td className="border-b-1 border-gray-400 py-4 flex justify-around">
                            <motion.button onClick={(e)=>handleEdit(stagiaires.id,e.preventDefault())} whileTap={{scale:0.9}} type="button"><i class="ri-edit-2-fill bg-blue-600 p-2 rounded hover:cursor-pointer hover:bg-blue-800"></i></motion.button>
                            <motion.button onClick={(e)=> handleDelete(stagiaires.id,e.preventDefault())}whileTap={{scale:0.9}} type="button"><i class="ri-close-fill bg-red-600 p-2 rounded hover:cursor-pointer hover:bg-red-800"></i></motion.button> 
                        </td>
                    </tr>)
                ))}
                </thead>
            </table>
        </motion.div>
        <motion.div className="m-auto bg-gray-800 w-[80%] p-4" 
        initial={{opacity:0,x:50}}       
        animate={{opacity:1,x:0}}
        transition={{duration:2,delay:0.5}}>
            <table className="text-center w-full rounde-xl my-5">
                <caption><h2 align="left" className=" text-2xl font-bold p-4 flex items-center ">Suivie de Présence</h2> <h2 align="right" className=""><button onClick={handlevalidate} className="px-4 py-2 bg-green-500  rounded hover:bg-green-700 hover:cursor-pointer my-4">Valider</button></h2></caption> 
                
                <thead>
                    
                    <tr className="bg-gray-600">
                        <th className="border-b-1 border-gray-400 py-4">Présence </th>
                        <th className="border-b-1 border-gray-400 py-4">Nom </th>
                        <th className="border-b-1 border-gray-400  py-4">Prenom </th>
                        <th className="border-b-1 border-gray-400  py-4">Heure d'arrivée</th>
                    </tr>
                {stagiaires && stagiaires.map((stagiaires,index)=>(
                    (<tr key={index}>
                        <td className="border-b-1 border-gray-400 py-4">

                        <input 
                        type="checkbox" 
                        name="checkbox" 
                        id="checked"  
                        checked={stagiaires.presence[0].statut}
                        disabled={stagiaires.presence[0].statut}
                        className="mx-4"
                         onClick={(e)=>handleCheck(index)}
                        /> 
                        </td>
                        <td className="border-b-1 border-gray-400 py-4 ">{stagiaires.nom} </td>
                        <td className="border-b-1 border-gray-400 py-4"> {stagiaires.prenom} </td>
                        {stagiaires.presence.map((p,index)=>(
                        <td className="border-b-1 border-gray-400 py-4" key={index}>
                            {p.heure_darrivee}
                        </td>
                    ))}
                    </tr>)
                ))}
                </thead>
            </table>
        </motion.div>
       
        
   
    </div>
    </>
}    
