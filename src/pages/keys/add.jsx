import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ToastContainer,toast } from "react-toastify"
import * as yup from 'yup'
export function Add(){

//Chargement du fichier Json afin

    const [stagiaire,setStagiaires]=useState([])

    useEffect(()=>{
        fetch ('http://localhost:3302/stagiaires')
        .then((response=>response.json()))
        .then((data)=>setStagiaires(data))
    },[])

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
    
//Creation de schema de validation avec yup

        const [error,setError]=useState()

        const validationschema=yup.object({
            nom: yup.string("jkjlkjlkjlkjkl").required("Le nom est obligatoire").min(3,"Minimum 3 caractères"),
            prenom:yup.string().required("Le prenom est obligatoire").min(3,"Minimum 3 caractères"),
            formation:yup.string().required("La formation est obligatoire"),
            date_de_debut:yup.date().required('Date requise').typeError('Date invalide'),
            date_de_fin:yup.date().required('Date requise').typeError("Date invalide").min(yup.ref('date_de_debut'),"La date de fin doit etre inferieure à la date de début")
        })


        const handleChange=(e)=>{
            const {name,value}=e.target
            setFormdata({
                ...formdata,
                [name]:value
            })
        }


//Recuperation des noms 

        const isName=stagiaire.findIndex(stagiaire=>{
            if(stagiaire.nom.toLowerCase().trim()==formdata.nom.toLowerCase().trim()){
                return stagiaire
            }
        })

        const handleSubmit= async (e)=>{
            e.preventDefault();
//Verifier si les valeurs entrées ne sont pas des nombres 
            const isvalidname=parseInt(formdata.nom)
            const isvalidprenom=parseInt(formdata.prenom)

// Verification des noms déjà inscrits 
                if(isNaN(isvalidname) && isNaN(isvalidprenom)){
                    if(isName){
                        if(stagiaire[isName].prenom.toLowerCase().trim()==formdata.prenom.toLowerCase().trim()){
                            toast.error(`${stagiaire[isName].nom } ${stagiaire[isName].prenom } existe déjà `, {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark"
             })
                        }
                    }else{
                try{
//Mise en place du schéma de validation 
                    await validationschema.validate(formdata,{abortEarly:false})
                    await fetch('http://localhost:3302/stagiaires',{
                        method:'POST',
                        headers:{
                            'Content-type':'application-json'
                        },
                        body:JSON.stringify(formdata)
                    })
//Message de confirmation en utilisant la bibliothèque Toastify

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

//Renitialisation des champs

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
                }catch(error){
                    const newError={}
                    error.inner.forEach(err=>{
                        newError[err.path]=err.message
                    })
                    setError(newError)
                    console.log(parseInt(formdata.nom));
                    toast.error(`Erreur de validation`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    })
                }
                            }
                        
        }else{
            toast.error(`Un des champs sont des nombres `, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    })
        }
                }
         
        

    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const input="my-2 px-4 py-2 border-2 rounded hover:border-blue-500"
    return <>
        <motion.form action="#"  className="flex justify-center items-center flex-col min-h-screen maxi " onSubmit={handleSubmit}
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:2,delay:0.5}}
        >
            <div className="flex flex-col border-2 border-white shadow-2xl shadow-gray-400 w-[40%] bg-white p-8 rounded">
                <h2 align="center" className="font-bold text-4xl">Ajouter des Stagiaires</h2>
                <label htmlFor="nom">Nom :</label>
                <input type="text" name="nom" placeholder="Entrer un nom ..." id="nom" className={input} value={formdata.nom.trim()}  onChange={handleChange}/>
                {error && error.nom && <p className="text-red-500">{error.nom}</p>}
                <label htmlFor="prenom" >Prénom :</label>
                <input type="text" name="prenom" placeholder="Entrer un prenom ..." id="prenom"  className={input} value={formdata.prenom} onChange={handleChange}/>
                {error && error.prenom && <p className="text-red-500">{error.prenom}</p>}
                <label htmlFor="nom">Formation :</label>
                <select name="formation" id="formation" className="px-4 py-2 border-2 rounded hover:border-blue-500 " value={formdata.formation} onChange={handleChange}>
                     <option value=""></option>
                    <option value="Developpement Logiciel">Developpement Logiciel</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                </select>
                {error && error.formation && <p className="text-red-500">{error.formation}</p>}
                <label htmlFor="debut">Date de début : </label>
                <input type="date" name="date_de_debut" placeholder="Debut de stage" id="debut"  className={input} value={formdata.date_de_debut} onChange={handleChange}/>
                {error && error.date_de_debut && <p className="text-red-500">{error.date_de_debut}</p>}
                <label htmlFor="fin" >Date de fin :</label>
                <input type="date" name="date_de_fin" placeholder="Fin de stage" id="fin"  className={input} value={formdata.date_de_fin} onChange={handleChange} />
                {error && error.date_de_fin && <p className="text-red-500">{error.date_de_debut}</p>}
                <div className="flex justify-between items-center">
                <button className={button} type="submit">Enregistrer</button> <Link to={'/Presence'} className="text-2xl hover:underline">Voir stagiaires</Link>
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