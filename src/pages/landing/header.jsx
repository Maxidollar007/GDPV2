export function Header(){
    return<>
        <div className="flex items-center justify-between p-4 shadow-xl maxi ">
            <h1 className="text-white text-2xl m-auto  ">StagiaTrack</h1>
           <nav className="flex gap-10 text-white w-fit m-auto ">
            <a href="" className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000">Acceuil</a>
            <a href="" className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000">Présence</a>
            <a href="" className=" px-4 py-2   hover:bg-gray-500 hover:rounded hover:transition duration-1000">Historique</a>
            <div className="flex items-center " >
                <button type="button" className="px-4 py-2  bg-purple-600 rounded hover:bg-purple-800 hover:cursor-pointer "  >Ajouter un stagiaire</button>
            </div>
           </nav>
        </div>
    </>
}