import { useState } from "react"

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
           alert("Stagiaires enregsitrées avec succès")
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

    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const input="my-2 px-4 py-2 border-2 rounded hover:border-blue-500"
    return <>
        <form action="#"  className="flex justify-center items-center flex-col min-h-screen maxi " onSubmit={handleSubmit}>
            <div className="flex flex-col border-2 border-white shadow-2xl shadow-gray-400 w-[40%] bg-amber-100 p-8 rounded">
                <h2 align="center" className="font-bold text-4xl">Ajouter des étudiants</h2>
                <label htmlFor="nom">Nom :</label>
                <input type="text" name="nom" placeholder="Entrer un nom ..." id="nom" required className={input} value={formdata.nom}  onChange={handleChange}/>
                <label htmlFor="prenom" >Prénom :</label>
                <input type="text" name="prenom" placeholder="Entrer un prenom ..." id="prenom" required className={input} value={formdata.prenom} onChange={handleChange}/>
                <label htmlFor="nom">Formation :</label>
                <select name="formation" id="formation" className="px-4 py-2 border-2 rounded hover:border-blue-500 " value={formdata.formation} onChange={handleChange}>
                    <option value="Developpement Web">Developpement Web</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                </select>
                <label htmlFor="debut">Date de début : </label>
                <input type="date" name="date_de_debut" placeholder="Debut de stage" id="debut" required className={input} value={formdata.date_de_debut} onChange={handleChange}/>
                <label htmlFor="fin" >Date de fin :</label>
                <input type="date" name="date_de_fin" placeholder="Fin de stage" id="fin" required className={input} value={formdata.date_de_fin} onChange={handleChange} />
                <div className="flex justify-between items-center">
                <button className={button} type="submit">Enregistrer</button> <a href=""className="text-2xl hover:underline">Voir stagiaires</a>
            </div>
            </div>
        </form>
    </>
}