import { Sidebar } from "../../dashboard/Sidebar";
import TableResource from "../tableResources";
import styles from '../../../css/Hresources.module.css'
import { Link } from "react-router-dom";

export default function HumanResource () {
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
        <TableResource/>
        </div>
        </>
    )
}