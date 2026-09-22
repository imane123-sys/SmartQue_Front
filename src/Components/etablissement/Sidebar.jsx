// import React from "react";

// import { ChevronsUpDown, LogOut } from "lucide-react";
// // import { useAuth } from "../AuthContext";

// export default function Sidebar() {
//   // const { user } = useAuth();
//   return (
//     <aside className="sidebar">
//       <div className="organization">
//         <div className="organization-box">
//           <div className="organization-left">
//             <div className="organization-logo">NH</div>

//             <div>
//               <div className="organization-name">Northstar Health</div>

//               <span className="organization-subtitle">Triage & Clinic Hub</span>
//             </div>
//           </div>

//           <ChevronsUpDown size={15} />
//         </div>
//       </div>

//       <div className="sidebar-user">
//         <div className="user-box">
//           <div className="user-avatar">AM</div>

//           <div className="user-info">
//             <span>Alex Morgan</span>
//             
//           </div>

//           <button className="logout-button">
//             <LogOut size={15} />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronsUpDown,
  LogOut,
  Ticket,
  BriefcaseBusiness,
} from "lucide-react";
// import { useAuth } from "../AuthContext";

export default function Sidebar() {
  // const { user } = useAuth();
  return (
    <aside className="sidebar">
      <div className="organization">
        <div className="organization-box">
          <div className="organization-left">
            <div className="organization-logo">NH</div>

            <div>
              <div className="organization-name">Northstar Health</div>

              <span className="organization-subtitle">Triage & Clinic Hub</span>
            </div>
          </div>

          <ChevronsUpDown size={15} />
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-item">
          <Ticket size={18} />
          <button>Tickets</button>
        </div>

        <Link to="/Etablissement-service">
          <button>
            
            <span>Services</span>
          </button>
        </Link>
      </div>

      <div className="sidebar-user">
        <div className="user-box">
          <div className="user-avatar">AM</div>

          <div className="user-info">
            <span>Alex Morgan</span>
            
          </div>

          <button className="logout-button">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
