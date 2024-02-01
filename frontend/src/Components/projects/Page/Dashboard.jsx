import { Sidebar } from "../../dashboard/Sidebar"
import Card from '../../Card';
import styles from '../../../css/Dashboard.module.css'
import BarChart from '../Chart/BarChart'
import PiesChart from "../Chart/PiesChart";
export default function DashboardEstad (){
    return (
        <>
        <Sidebar/>
        <div className={styles.Card}>
            <Card/>
            <div className={styles.text}>
                <h2>Estadisticas</h2>
            </div>
            <div className={styles.BarChart}>
            <BarChart/>
            </div>
            <div className={styles.Container}>
            <div className={styles.PiesChart}>
                <PiesChart/>
            </div>
            </div>
        </div>
        </>
    );
}