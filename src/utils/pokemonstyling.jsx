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
const PokemonEdit = ({btnsText, onClick}) => {

    return(
        <button className={`${styles.editbtn}`} onClick={onClick}>{btnsText}</button>
    )
}

export {PokemonTypography, PokemonAdd, PokemonButton, PokemonEdit};