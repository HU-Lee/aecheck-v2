import { Tooltip } from 'antd'
import React from 'react'
import { useIntl } from 'react-intl'
import { WEAPONS } from '../../data/constant'
import { stylemark } from '../../util/commonComponent'
import { ImageWrapper } from '../../util/styles'

/**
 * CharacterTableView
 * CharacterTable의 단위 Component입니다.
 * 
 * @param info  해당하는 캐릭터의 json data (+ 보유 정보)
 */
const CharacterTableView:React.FC<CharacterTableViewProps> = (info) => {

    // intl load
    const { formatMessage } = useIntl()
    
    // Tooltip에 표시하기 위해 무기 값을 추출
    const weapon = WEAPONS[info.category%10]

    return (
        <Tooltip title={`${formatMessage({id: info.code})}${info.style !== "4.5" ? " " + info.style.toUpperCase() : ""}
                       - ${formatMessage({id: info.sky})}, ${formatMessage({id: weapon})}`}>
            <ImageWrapper>
                {stylemark(info)}
                <img className={!info.have ? "gray" : ""} alt="select" src={`images/character/${info.id}.png`} width={60}/>
            </ImageWrapper>
        </Tooltip>
    )
}

export default CharacterTableView
