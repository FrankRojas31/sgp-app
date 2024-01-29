export default function Bar (){
    return (
        <ul className="menu">
						<li> All
							<div className="badge"> 87 </div>
						</li>
						<li className="selected"> Current
							<div className="badge"> 6 </div>
						</li>
						<li> Pending
							<div className="badge"> 2 </div>
						</li>
						<li> Completed
							<div className="badge"> 79 </div>
						</li>
						<li> Failed </li>
					</ul>
    );
}