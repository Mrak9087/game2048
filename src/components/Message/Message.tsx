import { FC, useMemo } from "react";

import './message.css';

interface IMessage {
    isShow:boolean;
    text:string;
    changeShow: (value:boolean)=> void
}

const Message:FC<IMessage> = ({isShow, text, changeShow}) => {

    const cl = useMemo(()=>{
        if (isShow) {
            return 'message active'
        }
        return 'message'
    }, [isShow])

    const handleClick = () => {
        changeShow(false);
    } 

    return (
        <div className={cl} onClick={handleClick}>
            <div className="close">&#10006;</div>
            {text}
        </div>
    )
}

export default Message;