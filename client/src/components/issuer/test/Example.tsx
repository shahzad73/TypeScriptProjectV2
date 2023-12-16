import React, { useContext } from 'react';
import AppContext from '../../common/AppContext';
import {useNavigate} from "react-router-dom";

export default function Example() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    function redir() {

    }

    React.useEffect(() => {
        //alert ("loaded control")

        return () => {
            //alert("unloade controal")
        };
    }, []);
        

    return (    
        <div>
            Use of Hooks and state variable 
            <br /><br />
            <p>You clicked {appContext.count} times</p>
            <button onClick={() => appContext.tickCounter()}> Click me </button>
            <br />
            <button onClick={() => redir()}> Naviage </button>            
        </div>
    );


}



