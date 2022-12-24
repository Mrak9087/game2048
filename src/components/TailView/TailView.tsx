import { FC, useMemo } from 'react';
import { getColor } from '../../helpers/helpers';
import { Tail } from '../../models/Tail';
import './tail.css';

interface ITail {
    tail:Tail;
}

const TailView:FC<ITail> = ({tail}) => {

    const tp = useMemo(()=>{
        return (tail.y * 100) + (tail.y * 10) + 10;
    },[tail.y])

    const lft = useMemo(()=>{
        return (tail.x * 100) + (tail.x * 10) + 10;
    },[tail.x])

    return (
        <div 
            className={tail.isNew ? 'tail new' : 'tail'}
            style={
                {
                    top:`${tp}px`,
                    left:`${lft}px`,
                    backgroundColor: getColor(tail.value),
                } as React.CSSProperties
            }
        >
            {tail.value}
        </div>
    )
}

export default TailView;