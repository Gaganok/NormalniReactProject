import './style.scss'

import StickyMenu from './component/StickyMenu'

export interface AdminDashboardProps {
    
}
 
const AdminDashboard: React.SFC<AdminDashboardProps> = () => {
    return ( 
        <div>
            <StickyMenu/>
            {/* Hello Dashboard */}
        </div>  
    );
}
 
export default AdminDashboard;