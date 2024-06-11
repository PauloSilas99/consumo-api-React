
import { useState,useEffect } from "react";
import './App.css'
const Lista = () =>{
    const [personagens,setPersonagens] = useState([]);
    const [carregar,setCarregar] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(()=>{
    fetch(`${apiUrl}/character`)
        .then((response)=>response.json())
        .then((data)=>{
            setPersonagens(data.results);
            setCarregar(false)
            console.log(data)
        })
        .catch((error)=>{
            console.log('Erro:'+ error);
            setCarregar(false);
        });
    },[apiUrl])
    if(carregar){
        return <div>Loading...</div>;
    }
    return(
        <>
            <h1>Personagens</h1>
            <ul className="ulPersonagens">
                {personagens.map((personagem) => (
                    <li key={personagem.id}>
                        <img src={personagem.image} alt={personagem.name} />
                        <p>{personagem.name}</p>
                        <p>Aparições em episódios: {personagem.episode.length}</p>
                        <p>Espécie: {personagem.species}</p>
                        <p style={{ display: 'none' }}>Criado em: {personagem.created}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Lista;