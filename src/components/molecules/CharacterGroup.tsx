import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_NEW, JAP_NEW } from '../../data/config'
import { FlexColumnCenterDiv } from '../../util/styles'
import CharacterSelect from '../atoms/CharacterSelect'

/**
 * CharacterGroup
 * Checklist의 캐릭터별 Component입니다.
 * 
 * @param infos  해당하는 캐릭터의 json data array
 */
const CharacterGroup:React.FC<CharInfoProps> = ({infos}) => {

    // intl, context load
    const { formatMessage } = useIntl()
    const { version } = useContext(AnotherContext)

    // 새로 나온 캐릭터 강조표시
    const target_chars = version==="japanese" ? JAP_NEW : GLO_NEW
    const color = target_chars.includes(infos[0].code) ? "red" : "lightblue"

    return (
        <FlexColumnCenterDiv
            style={{
                width: "100%",
                padding: "5px 2px 5px 2px", 
                margin: '1px auto', 
                border: `2px solid ${color}`,
                borderRadius: "5px"
            }}
        >
            <b>
                {formatMessage({id: infos[0].code})}
                {color==="red" ? <b style={{color: "red"}}> (Update!)</b> : null}
            </b>    
            <div style={{marginTop: 3}}>               
                {infos.map(info => (
                    <CharacterSelect key={info.id} {...info}/>
                ))}
            </div>         
        </FlexColumnCenterDiv>
    )
}

export default CharacterGroup
