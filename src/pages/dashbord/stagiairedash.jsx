import { useEffect, useState } from "react"

export function Stagiaires(){

        const [stagiaires,setStagiaires]=useState([])

//Chargement des données des stagiaires

    useEffect(()=>{
        fetch('http://localhost:3302/stagiaires')
        .then(response=>response.json())
        .then(data=>setStagiaires(data))
    },[])
    console.log(stagiaires);
    

    return <>
         <div className="flex w-full p-2 shadow-2xl h-[14%]">
                    <div className="flex justify-start mx-5">
                        <img src="/src/assets/logi.jpg" height="90px" width="90px" className="rounded-2xl"/> <h2 className="flex items-center text-3xl text-white maxi mx-5">DAHSBOARD</h2>
                    </div>
                </div>
                <div className="h-[86%] w-full flex mx-auto">
                    <div className=" w-[15%] h-full flex flex-col justify-between text-white maxi shadow-2xl">
                        <div className="w-full">
                             <ul className=" grid grid-rows-4 my-5">
                                <li className="flex p-3 items-center cursor-pointer hover:bg-gray-500 hover:transition-all duration-1000 ">
                                    <a href="" className=" flex items-center text-xl gap-10">
                                        <i class="ri-eye-line text-2xl"></i> 
                                        <span>Ensemble</span>
                                    </a>
                                </li>
                                <li className="flex items-center cursor-pointer hover:bg-gray-500 hover:transition-all duration-1000  ">
                                    <a href="" className="flex items-center text-xl gap-10">
                                        <i class="ri-user-line text-2xl ml-2"></i>
                                        <span>Liste des stagiaires</span>
                                    </a>
                                </li>
                                <li className="flex  items-center cursor-pointer hover:bg-gray-500 hover:transition-all duration-1000  ">
                                    <a href="" className="flex items-center text-xl gap-10">
                                        <i class="ri-chat-history-line text-2xl ml-2"></i>
                                        <span>Historique</span>
                                    </a>
                                </li>
                                <li className="flex items-center cursor-pointer hover:bg-gray-500 hover:transition-all duration-1000  ">
                                    <a href="" className="flex items-center text-xl gap-10">
                                        <i class="ri-tools-line text-2xl ml-2"></i>
                                        <span>Paramètre</span>
                                    </a>
                                </li>
                                
                            </ul>    
                        </div>
                        <div className="flex justify-around items-center w-full mb-10 py-4 cursor-pointer text-white hover:bg-red-500 hover:transition-all duration-1000">
                            <i class="ri-door-open-line text-2xl text-white"></i><button className="text-2xl" >Deconnexion</button>
                        </div>
        
                    </div>
                    <div className="h-full w-[85%] text-white mx-auto">
                       
                    </div>
                </div>
    </>
}