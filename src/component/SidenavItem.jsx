import { useState } from "react"
import "./css/sidenav.css"
import { NavLink } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"


export default function SidenavItem({item}){

    const [open, setOpen] = useState(false)
    const {currentColor} = useStateContext()
    if(item.childrens){
        return(
            <div className={open ?"sidebar-item hover:border open" : "sidebar-item hover:border"} style={{color: currentColor,borderColor: currentColor}} onClick={() => setOpen(!open)} >
                <div className="sidebar-title">
                    <span>
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                    </span>
                    <i className="bi-chevron-down toggle-btn" ></i>
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child,index) => <SidenavItem key={index} item={child}/>)}
                </div>

            </div>
        )
    }else {
        return(
                <NavLink to={item.path} className="sidebar-item plain" style={{color: currentColor}}>
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                </NavLink>
        )
    }
}