import React, { useContext } from 'react'
import { AnotherContext } from '../../contexts'
import { stylemark } from '../../util/commonComponent'

/**
 * CharacterSelect
 * 
 * 캐릭터를 선택할 수 있는 Component
 * @param data : 해당하는 캐릭터의 json data
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
            {stylemark(data)}
            <img className={!inven.includes(data.id) ? "gray" : ""} alt="select"
                src={`images/character/${data.id}.png`} 
            style={{width:60, borderRadius:3 }}/>
        </div>
    )
}

export default CharacterSelect
