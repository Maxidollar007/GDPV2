import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ToastContainer,toast } from "react-toastify"
export function Add(){

        const [formdata,setFormdata]=useState({
            nom:"",
            prenom:"",
            formation:"",
            date_de_debut:"",
            date_de_fin:"",
            presence:[
                {
                    heure_darrivee:"",
                    statut:false
                }
            ]
        })
        


        const handleChange=(e)=>{
            const {name,value}=e.target
            setFormdata({
                ...formdata,
                [name]:value
            })
        }
        
        const handleSubmit= async (e)=>{
            e.preventDefault();
           await fetch('http://localhost:3302/stagiaires',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formdata)
           });
           
           setFormdata({
            nom:"",
            prenom:"",
            formation:"",
            date_de_debut:"",
            date_de_fin:"",
            presence:[
                {
                    heure_darrivee:"",
                    statut:false
                }
            ]
        })
        }

//Utilsation du message de confirmation
        const notify=()=>{
        toast.success(' Stagiaire enregistré', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
});
        }

        
        

    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const input="my-2 px-4 py-2 border-2 rounded hover:border-blue-500"
    return <>
        <motion.form action="#"  className="flex justify-center items-center flex-col min-h-screen maxi " onSubmit={handleSubmit}
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:2,delay:0.5}}
        >
            <div className="flex flex-col border-2 border-white shadow-2xl shadow-gray-400 w-[40%] bg-amber-100 p-8 rounded">
                <h2 align="center" className="font-bold text-4xl">Ajouter des Stagiaires</h2>
                <label htmlFor="nom">Nom :</label>
                <input type="text" name="nom" placeholder="Entrer un nom ..." id="nom" required className={input} value={formdata.nom}  onChange={handleChange}/>
                <label htmlFor="prenom" >Prénom :</label>
                <input type="text" name="prenom" placeholder="Entrer un prenom ..." id="prenom" required className={input} value={formdata.prenom} onChange={handleChange}/>
                <label htmlFor="nom">Formation :</label>
                <select name="formation" id="formation" className="px-4 py-2 border-2 rounded hover:border-blue-500 " value={formdata.formation} onChange={handleChange}>
                     <option value=""></option>
                    <option value="Developpement Logiciel">Developpement Logiciel</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                </select>
                <label htmlFor="debut">Date de début : </label>
                <input type="date" name="date_de_debut" placeholder="Debut de stage" id="debut" required className={input} value={formdata.date_de_debut} onChange={handleChange}/>
                <label htmlFor="fin" >Date de fin :</label>
                <input type="date" name="date_de_fin" placeholder="Fin de stage" id="fin" required className={input} value={formdata.date_de_fin} onChange={handleChange} />
                <div className="flex justify-between items-center">
                <button className={button} type="submit" onClick={notify}>Enregistrer</button> <Link to={'/Presence'} className="text-2xl hover:underline">Voir stagiaires</Link>
            </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
        </motion.form>
    </>
    
}