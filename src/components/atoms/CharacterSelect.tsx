import React, { useContext } from 'react'
import styled from 'styled-components'
import { AnotherContext } from '../../contexts'

const Stylemark = styled.img`
    position: absolute;
    width: 30px;
    left: -6px;
    top: -6px;
    z-index: 3;
`

/**
 * CharacterSelect
 * 
 * 캐릭터를 선택할 수 있는 Component
 */
const CharacterSelect:React.FC<CharacterInfo> = (data) => {

    // context load
    const {addInven, removeInven, inven} = useContext(AnotherContext)

    const toggleInven = (id: number) => {
        if(inven.includes(id)) 
            removeInven(id)
        else {
            const newData = data.from ? [id, ...data.from] : [id]
            addInven(newData)
        }
    }

    return (
        <div onClick={() => toggleInven(data.id)} style={{position: "relative", width:60, margin: 3, display: "inline-block"}}>
            {data.style !== "4.5" ? <Stylemark src={`images/category/${data.style}.png`}/> : null}
            <img className={!inven.includes(data.id) ? "gray" : ""} alt="select"
                src={`images/character/${data.id}.png`} 
            style={{width:60, borderRadius:3 }}/>
        </div>
    )
}

export default CharacterSelect
