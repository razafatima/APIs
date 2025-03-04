import styles from '../components/style/styles.module.css';


const PokemonTypography =({text})=>{
    return(
        <h1 className={`${styles.title}`}>{text}</h1>
    );
   
}

const PokemonAdd = ({btnText, onClick}) => {
    return(
          
        <button className={`${styles.btn}`}  onClick={onClick}>{btnText}</button>

    );
}

const PokemonButton = ({btn, onClick}) =>{
    return(
          <button className={`${styles.btns}`} onClick={onClick}>{btn}</button>
    );
}





export {PokemonTypography, PokemonAdd, PokemonButton};