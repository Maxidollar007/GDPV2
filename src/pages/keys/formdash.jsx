import { useEffect, useState } from "react"
import * as yup from 'yup'
import { motion } from "motion/react"
import { ToastContainer,toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export function Formdashboard(){


    const navigate=useNavigate()
    const [admin,setAdmin]=useState([])

    useEffect(()=>{
        fetch('http://localhost:3302/admin')
        .then(response=>response.json())
        .then(data=>setAdmin(data))

    },[])
    
        

    const [formadash,setFormdash]=useState({
        nom:"",
        password:""
    })

    const handleChangedash=(e)=>{
        const {name,value}=e.target
        setFormdash({
            ...formadash,
            [name]:value
        })
    }

    const [errordash,setErrordash]=useState()

    const validatedash=yup.object({
        nom:yup.string().required("Le nom est requis"),
        password:yup.string().required("Mot de passe requis")
    })

    const isAdmin=admin.findIndex(admin=>{
        if(admin.nom.toLowerCase()==formadash.nom.toLowerCase()){
            return admin
        }
    })    

    

    const handleSubmitdash=async (e)=>{
        e.preventDefault();
        try{
                    await validatedash.validate(formadash,{abortEarly:false})
                    if(isAdmin>=0){
                        if(admin[isAdmin].password.toLowerCase()==formadash.password.toLowerCase()){
                                toast.success(`Bienvenue ${admin[isAdmin].nom}`, {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark"
                                })
                        }else{
                                    toast.error(`Erreur de connexion`, {
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
                        }else{
                                            toast.error(`N'existe pas`, {
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
                }catch(error){
                    const newError={}
                   error.inner.forEach(err => {
                        newError[err.path]=err.message
                   });
                   setErrordash(newError)
                   console.log(errordash);
                }


}
           /* if(isAdmin>=0){
            if(admin[isAdmin].password.toLowerCase()==formadash.password.toLowerCase()){
                
            }
           }
            
           }

    } */


    const button="px-4 py-2 bg-blue-500 mt-4 rounded hover:bg-blue-700 hover:cursor-pointer"
    const input="my-2 px-4 py-2 border-2 rounded hover:border-blue-500"

    return<>
         <motion.form action="#"  className="flex justify-center items-center flex-col min-h-screen maxi "onSubmit={handleSubmitdash}
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:2,delay:0.5}}
        >
            <div className="flex flex-col border-2 border-white shadow-2xl shadow-gray-400 w-[40%] bg-white p-8 rounded">
                <h2 align="center" className="font-bold text-4xl">Administrateur</h2>
                <label htmlFor="nom">Nom :</label>
                <input type="text" name="nom" placeholder="Entrer un nom ..." id="nom" className={input}  value={formadash.nom} onChange={handleChangedash}  />
                {errordash && errordash.nom && <p className="text-red-500">{errordash.nom}</p>} 
                <label htmlFor="password" >Mot de Passe :</label>
                <input type="password" name="password" placeholder="Identification" id="password"  className={input} value={formadash.password} onChange={handleChangedash} />
                {errordash && errordash.password && <p className="text-red-500">{errordash.password}</p>}
                <span className="maxi underline flex justify-center my-auto hover:cursor-pointer hover:text-blue-600">Show password</span>
                <button className={button} type="submit">Connexion</button>
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