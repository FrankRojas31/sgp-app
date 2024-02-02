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
        </div>
        </>
    );
}