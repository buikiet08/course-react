import classNames from "classnames"
import React, { createContext, useContext, useState } from "react"
import styled from "styled-components"


const ContentWrap = styled.div`
    display: block !important;
`

const Context = createContext({activeContent: -1})

export const Accordition = ({date,title,index,children}) => {
    const [isOpen,setIsOpen] = useState(false)
    const {activeContent, onActive} = useContext(Context)

    const active = activeContent === index
    const _onClick = () => {
        onActive(index)
    }
    return (
        <div className={classNames('accordion', {active})}>
            <div className="accordion__title" onClick={_onClick}>
                {
                    date && <div className="date">Ngày {date}</div>
                }
                <h3>{title}</h3>
            </div>
            {
                active && <ContentWrap className="content" dangerouslySetInnerHTML={{ __html: children}} />
            }
        </div>
    )
}

Accordition.Group = ({children}) => {
    const [activeContent,setActiveContent] = useState(-1)
    const onActive = (i) => {
        setActiveContent(i === activeContent ? -1 : i)
    }

    return (
        <Context.Provider value={{onActive, activeContent}}>
            {
                React.Children.map(children, (child, i) => React.cloneElement(child, {index: i}))
            }
        </Context.Provider>
    )
}

// export default function Accordition ({active,title,date,children}) {
//     return (
//         <div className='accordion'>
//             <div className="accordion__title" onClick={_onClick}>
//                 {
//                     data && <div className="date">Ngày {date}</div>
//                 }
//                 <h3>{title}</h3>
//             </div>
//             {
//                 active && <ContentWrap className="content" dangerouslySetInnerHTML={{ __html: children}} />
//             }
//         </div>
//     )
// }