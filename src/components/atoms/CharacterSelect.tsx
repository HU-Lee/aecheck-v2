import React, { useContext } from 'react'
import { AnotherContext } from '../../contexts'
import { stylemark } from '../../util/commonComponent'
import { ImageWrapper } from '../../util/styles'

/**
 * CharacterSelect
 * Checklist에서 캐릭터를 선택할 수 있는 Component입니다.
 * 
 * @param info  해당하는 캐릭터의 json data
 */
const CharacterSelect:React.FC<CharacterInfo> = (info) => {

    // context load
    const {addInven, removeInven, inven} = useContext(AnotherContext)

    const toggleInven = (id: number) => {
        if(inven.includes(id)) 
            removeInven(id)
        else {
            addInven([id, ...info.from])
        }
    }

    return (
        <ImageWrapper onClick={() => toggleInven(info.id)}>
            {stylemark(info)}
            <img className={!inven.includes(info.id) ? "gray" : ""} alt="select" src={`images/character/${info.id}.png`} width={60}/>
        </ImageWrapper>
    )
}

export default CharacterSelect
