import React from 'react'
import { emptyImage } from '../../util/commonComponent'
import { GridDiv } from '../../util/styles'
import BuddyGroup from '../molecules/BuddyGroup'

/**
 * CheckComponent
 * MainPage의 필터를 제외한 체크리스트 부분 Component입니다.
 * 
 * @param infos  해당하는 캐릭터의 json data array
 */
 const BuddyCheckComponent:React.FC<BuddyOrganProps> = ({infos, buddys}) => {

    return (
        <div id="buddyresult">
            <h2><b>Buddy</b></h2>
            <GridDiv>
                {buddys.length > 0 ? buddys.map(buddy => (
                    <BuddyGroup
                        buddy={buddy}
                        infos={infos.filter(a => buddy.from.includes(a.id))}                    
                        key={buddy.id}
                    />
                )) : emptyImage("JAPANESE Only / 일판 전용입니다.")}
            </GridDiv>
        </div>
    )
}

export default BuddyCheckComponent