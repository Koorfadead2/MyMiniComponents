import { useState } from "react";
import data from "./data"
import s from "./accordion.module.css"
import React from "react";

export const Accordion = function ({}){
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = React.useState<any[]>([]);

    function handleSingleSelection(getCurrentId: any):void{
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId: any):void{
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        if(findIndexOfCurrentId === -1) 
            copyMultiple.push(getCurrentId);
        else
            copyMultiple.splice(findIndexOfCurrentId, 1);

        setMultiple(copyMultiple);
    }   

    return (
        <div className={s.accordWrapper}>
            <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
            <div className={s.accordContent}>
                {
                    data && data.length > 0 ?
                    data.map(dataItem => <div key={dataItem.id} className={s.item}>
                        <div onClick={ enableMultiSelection 
                                        ? () => handleMultiSelection(dataItem.id) 
                                        : () => handleSingleSelection(dataItem.id) } className={s.title}>
                            <h3>{ dataItem.question }</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultiSelection 
                            ? multiple.indexOf(dataItem.id) !== -1 &&
                              <div className={s.content}>{ dataItem.answer }</div> 
                            : selected === dataItem.id && (
                                <div className={s.content}>{ dataItem.answer }</div>
                            )
                        }
                        { /*selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? <div className={s.content}>{ dataItem.answer }</div> : null */ }
                    </div>)
                    :<div>No data</div>
                }
            </div>
        </div>
    )
}