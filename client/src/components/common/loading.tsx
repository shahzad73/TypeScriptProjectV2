import React, { useState } from "react";

export default function Loading(props :{message: string}) {

    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <span>
        <img src="/img/loadingdots2.gif" height="50px" /> {props.message}  
      </span>
    );

}
