import { Tooltip } from 'antd'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { ELEMENTS, WEAPONS } from '../../data/constant'

/**
 * CharacterResult
 * My Character의 결과를 나타내는 Component입니다.
 * 
 * @param info  해당하는 캐릭터의 json data
 */
const CharacterResult:React.FC<CharacterInfo> = (info) => {
    
    // intl, context load
    const { formatMessage } = useIntl()
    const { version } = useContext(AnotherContext)

    // Tooltip과 View에 표시하기 위해 속성과 무기 값을 추출
    const element = ELEMENTS[Math.floor(info.category/10)]
    const weapon =  WEAPONS[info.category%10]

    return (
        <Tooltip title={`${formatMessage({id: info.code})}${info.style !== "4.5" ? " " + info.style.toUpperCase() : ""}
                       - ${formatMessage({id: info.sky})}, ${formatMessage({id: weapon})}`}>
            <img 
                src={`images/character/${info.id}.png`} 
                alt="result" 
                className={ `${version==="global" && info.jonly ? "trans" : ""} ${element}`}
                style={{width: "18%", maxWidth:65, borderRadius:3, margin:1 }}
            />
        </Tooltip>
    )
}

export default CharacterResult
