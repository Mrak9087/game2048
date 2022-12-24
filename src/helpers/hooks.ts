import React, { useEffect } from "react"

export const useEvent = (nameEvent: keyof DocumentEventMap, handler:(event:Event | KeyboardEvent)=>void)=>{

    useEffect(() => {
        document.addEventListener(nameEvent, handler, false);
        return () => {
            document.removeEventListener(nameEvent, handler, false  );
        }
    },[handler])

}