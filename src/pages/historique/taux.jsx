export function Taux(props){
    return<>
        <div className={` h-fit rounded w-fit p-6  mx-auto ${props.color}`}>
            <h2 align="center" className="font-bold text-3xl">{props.number} </h2>
            <h2 align="center" >{props.presence}</h2>
            <h3 align="center">{props.date} </h3>
        </div>
    </>

}