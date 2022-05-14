import React from 'react'
import { GridDiv } from '../../util/styles'
import CharacterGroup from '../molecules/CharacterGroup'

/**
 * CheckComponent
 * MainPage의 필터를 제외한 체크리스트 부분 Component입니다.
 * 
 * @param infos  해당하는 캐릭터의 json data array
 */
const CheckComponent:React.FC<CharInfoProps> = ({infos}) => {

    // character code만 추출한 배열
    const codes = Array.from(new Set(infos.map(a => a.code)))

    return (
        <GridDiv>
            {codes.map(code => (
                <CharacterGroup infos={infos.filter(a => a.code === code)} key={code}/>
            ))}
        </GridDiv>
    )
}

export default CheckComponent

