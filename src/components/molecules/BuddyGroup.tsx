import { notification, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_BUDDY_NEW, JAP_BUDDY_NEW } from '../../data/config'
import { FlexColumnCenterDiv, ImageWrapper } from '../../util/styles'

/**
 * CharacterGroup
 * Checklist의 캐릭터별 Component입니다.
 * 
 * @param infos  해당하는 캐릭터의 json data array
 */
const BuddyGroup:React.FC<BuddyMoleculeProps> = ({infos, buddy}) => {

    // intl, context load
    const { formatMessage } = useIntl()
    const { version, inven, buddyInven, addBuddy, removeBuddy } = useContext(AnotherContext)

    const toggleBuddy = (id: number) => {
        if (!buddy.from.every(a => inven.includes(a)))
            return notification.info({
                message: '파트너 캐릭터가 없습니다.',
                style: {
                    textAlign: "left"
                }
            })
        if(buddyInven.includes(id)) 
            removeBuddy(id)
        else {
            addBuddy([id])
        }
    }

    // 새로 나온 캐릭터 강조표시
    const target_chars = version==="japanese" ? JAP_BUDDY_NEW : GLO_BUDDY_NEW
    const color = target_chars.includes(buddy.code) ? "red" : "lightblue"

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
                {formatMessage({id: buddy.code})}
                {color==="red" ? <b style={{color: "red"}}> (Update!)</b> : null}
            </b>
            <div style={{display: "flex", width: "100%", justifyContent: 'center', alignItems: "center"}}>
                <div style={{marginTop: 3, width: '70%'}}>
                    <ImageWrapper onClick={() => toggleBuddy(buddy.id)}>
                        <img className={!buddyInven.includes(buddy.id) ? "gray" : ""} alt="select" src={`images/buddy/${buddy.id}.png`} width={60}/>
                    </ImageWrapper>            
                </div>         
                <div>
                    {infos.map(info => (
                        <Tooltip title={`${formatMessage({id: info.code})}${info.style !== "4.5" ? " " + info.style.toUpperCase() : ""} 필요`}>
                            <div key={info.id} style={{position: "relative"}}>
                                <img className={!inven.includes(info.id) ? "gray" : ""} 
                                    alt="select"
                                    style={{border: "1px solid gray"}}
                                    src={`images/character/${info.id}.png`} 
                                    width={40}
                                />
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </div>    
        </FlexColumnCenterDiv>
    )
}

export default BuddyGroup
