import Loader from "react-loader-spinner";
import React from "react";
import styles from './Loader.module.css';

function loader(){
    return (
        <div className={styles.centered}>
            <Loader type='Bars' color='#00b5ad' height={200} width={200}/>
        </div>
    )
}
export default loader;