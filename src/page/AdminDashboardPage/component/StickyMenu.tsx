import {FavoriteRounded,Home, PermContactCalendar, BarChart, Dialpad, AdbRounded, AddCircle} from '@material-ui/icons';

export interface StickyMenuProps {
    
}
 
const StickyMenu: React.FunctionComponent<StickyMenuProps> = () => {
    return ( 
        <div className="sticky">
            <div className="menu--upper">
                <div className="logo">
                    <AdbRounded/>
                </div>
                <div className="menu__content">
                    <Home style={{color: "white", fontSize:40}}/>
                    <PermContactCalendar className="icon__item"/>
                    <BarChart/>
                    <Dialpad />
                </div>
            </div>
            <div className="menu--lower">
                <div className="menu__content">
                    <FavoriteRounded/>
                    <AddCircle/>
                    <AddCircle/>
                    <AddCircle/>
                </div>

                <div className="menu__content">
                    <FavoriteRounded/>
                    <AddCircle/>
                    <AddCircle/>
                    <AddCircle/>
                </div>
            </div>
        </div>  
    );
}
 
export default StickyMenu;