
export function Nav(){
    return <>
        <div className="flex w-full p-2 shadow-2xl h-[14%]">
            <div className="flex justify-start mx-5">
                <img src="/src/assets/logi.jpg" height="90px" width="90px" className="rounded-2xl"/> <h2 className="flex items-center text-3xl text-white maxi mx-5">DAHSBORD</h2>
            </div>
        </div>
        <div className="h-[86%] w-full flex mx-auto">
            <div className="w-[15%] bg-gray-800 h-full flex flex-col justify-between text-white maxi shadow-2xl">
                <div className="w-full">
                     <ul className="grid grid-rows-3  my-5">
                        <li className="flex justify-around items-center cursor-pointer hover:bg-gray-600 hover:transition-all duration-1000 ">
                            <i class="ri-eye-line text-2xl"></i> <a href="" className="text-2xl px-2 py-2 mb-1">Ensemble</a>
                        </li>
                        <li className="flex justify-around items-center cursor-pointer hover:bg-gray-600 hover:transition-all duration-1000  ">
                            <i class="ri-user-line text-2xl"></i><a href="" className="text-2xl px-2 py-2 mb-1">Stagiaires</a>
                        </li>
                        <li className="flex justify-around items-center cursor-pointer hover:bg-gray-600 hover:transition-all duration-1000  ">
                           <i class="ri-chat-history-line text-2xl"></i> <a href="" className="text-2xl px-2 py-2 mb-1">Historique</a>
                        </li>
                        <li className="flex justify-around items-center cursor-pointer hover:bg-gray-600 hover:transition-all duration-1000 ">
                            <i class="ri-tools-line text-2xl"></i><a href="" className="text-2xl px-2 py-2 mb-1">Paramètre</a>
                        </li>
                    </ul>    
                </div>
                <div className="flex justify-around items-center cursor-pointer w-full mb-10 py-4 text-white hover:bg-red-500 hover:transition-all duration-1000 hover:cursor-pointer">
                    <i class="ri-door-open-line text-2xl text-white"></i><button className="text-2xl" >Deconnexion</button>
                </div>

            </div>
        </div>
    </>
}