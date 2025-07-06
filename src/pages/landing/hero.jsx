export function Hero(){
    const button="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 hover:cursor-pointer"
    return <>
        <div className="text-white h-[70%] flex items-center justify-between w-full maxi">
            <div className="w-[40%] flex  flex-col p-4 m-auto flex-wrap ">
                <h2 className="text-5xl mt-10 ">Optimisez la gestion de presence  avec une solution numérique perfomante</h2>
                <div className="my-4 text-2xl">
                    Cette application vous offre une interface intuitive pour enregistrer , suive et analyser les presences de vos
                    stagiaires.Gagnez en fiabilité et efficacité grâce à <span>StagiaTrack</span>
                </div>
                <a href=""  align="center" className=" my-8 m-auto flex-wrap"> <button type="button" className=" m-auto px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 hover:cursor-pointer"  >Commencer dès maintenant</button></a>
            </div>
            <div className="bg-[url('assets/people-working-together-animation-studio~1.webp')] bg-cover bg-center w-[45%] h-full mx-auto mt-8">

            </div>

        </div>
        

    </>
}