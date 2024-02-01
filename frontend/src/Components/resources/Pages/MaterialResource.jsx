import { Sidebar } from "../../dashboard/Sidebar";
import TableResource from "../tableResources";
import styles from '../../../css/Mresources.module.css'
import TableMaterialResource from "../tableMResources";
import { Link } from "react-router-dom";

export default function MaterialResources () {
    return (
        <>
        <div>
        <Sidebar/>
        <div>
            <h1 className={styles.container}>Recursos</h1>
            <div className={styles.linkbuttons}>
            <Link to={'/HumanResources'}>
                <button className={styles.buttonlink1}>Recursos Humanos</button>
                </Link>
                <Link to={'/MaterialResources'}>
                <button className={styles.buttonlink2}>Recursos Materiales</button>
                </Link>
            </div>
        </div>
        <TableMaterialResource/>
        </div>
        </>
    )
}