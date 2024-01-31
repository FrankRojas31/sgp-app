import LinesChart from './Chart/LinesChart';
import BarsChart from './Chart/BarChart';
import PiesChart from './Chart/PiesChart';
import styles from '../../css/Estadistics.module.css';

export default function Estadistics() {
  return (
    <>
    <div className={styles.scrollContainer}>
      
      <div className={styles.mainContent}>
        <div className={`${styles.bgLight} ${styles.mxAuto} ${styles.px2} ${styles.border} ${styles.border2} ${styles.borderPrimary} ${styles.chartContainer}`}>
          <LinesChart />
        </div>
        <br/>
        <div className={`${styles.bgLight} ${styles.mxAuto} ${styles.px2} ${styles.border} ${styles.border2} ${styles.borderPrimary} ${styles.chartContainer}`}>
          <BarsChart />
        </div>
        <br/>
        <div className={`${styles.bgLight} ${styles.mxAuto} ${styles.border} ${styles.border2} ${styles.borderPrimary} ${styles.chartContainer}`}>
          <div style={{ width: '100%', height: '100%', padding: '10px 0' }}>
            <PiesChart />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
