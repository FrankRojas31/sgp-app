import styles from '../css/targetTeam.module.css';
import PersonIcon from '@mui/icons-material/Person';
import defaultImage from '../assets/ppDefault.jpeg';

function TargetTeam() {
  // Datos simulados para dos equipos con sus miembros
  const teamsData = [
    {
      teamName: 'Equipo #1',
      members: ['Juan', 'José', 'Gabriel'],
    },
    {
      teamName: 'Equipo #2',
      members: ['María', 'Ana', 'Carlos'],
    },
  ];

  return (
    <div className={styles.tableContainer}>
      {teamsData.map((team, index) => (
        <div key={index} className={styles.teamContainer}>
          <table className={styles.myTable}>
            <tbody>
              <tr>
                <td className={styles.myTableCell}>{team.teamName}</td>
              </tr>
              <tr>
                <td className={styles.myTableCell}>MIEMBROS</td>
              </tr>
              {team.members.map((member, memberIndex) => (
                <tr key={memberIndex}>
                  <td className={styles.membersCol}>
                  <img 
        className={styles.iconpp} 
        src={member.image || defaultImage} 
        alt={member.name} 
      />
                    {member}
                  </td>
                </tr>
              ))}
            </tbody>
            <button className={styles.verMiembrosButton}>VER MIEMBROS</button>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TargetTeam;
