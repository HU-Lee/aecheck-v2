import { Tooltip } from 'antd'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { ELEMENTS, WEAPONS } from '../../data/constant'

/**
 * CharacterResult
 * 
 * 체크리스트 사이트 결과를 표시하는 단위
 */
const CharacterResult:React.FC<CharacterInfo> = (data) => {
    
    // intl, context load
    const { formatMessage } = useIntl()
    const { version } = useContext(AnotherContext)

    // Tooltip에 표시하기 위해 속성과 무기 값을 추출
    const element = ELEMENTS.find(a => a.id === Math.floor(data.category/10))
    const weapon = WEAPONS.find(a => a.id === data.category%10)


    return (
        <Tooltip title={`${formatMessage({id: data.code})}${data.style !== "4.5" ? " " + data.style.toUpperCase() : ""}
                       - ${formatMessage({id: data.sky})}, ${formatMessage({id: weapon?.weapon})}`}>
            <img src={`images/character/${data.id}.png`} alt="result"
            className={ `${version==="global" && data.jonly ? "trans" : ""} ${element?.element}`}
            style={{width: "18%", maxWidth:65, borderRadius:3, margin: 1 }}/>
        </Tooltip>
    )
}

export default CharacterResult
