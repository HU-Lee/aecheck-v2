import { Input } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { new_buddy_to_top } from '../../util/function'
import { FlexColumnCenterDiv, PageWrapper } from '../../util/styles'
import Downloader from '../atoms/Downloader'
import BuddyCheckComponent from '../organisms/BuddyCheckComponent'

const { Search } = Input;

function BuddyPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { select_char_data, version } = useContext(AnotherContext)

    const buddy_data: Array<BuddyInfo> = require("../../data/buddy.json")

    /**
     * @param SearchName : 캐릭터 검색어
     */
    const [SearchName, setSearchName] = useState("")

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    }

    // 설정값에 따라 데이터를 filter
    const filtered = buddy_data
    .filter(e => SearchName==="" || formatMessage({id: e.code}).toLowerCase().includes(SearchName.toLowerCase()))
    .filter(e => {
        if(version==="japanese") return !e.gonly
        else return !e.jonly
    })

    new_buddy_to_top(filtered, version)

    return (
        <PageWrapper style={{maxWidth: "1400px"}}>
            <FlexColumnCenterDiv style={{margin: "15px"}}>
                <b>Search</b>
                <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}>
                    <Search 
                        style={{width:"250px", margin: "5px"}} 
                        placeholder="Search..." 
                        value={SearchName} 
                        onChange={HandleChange}
                        enterButton
                        allowClear
                    />
                </div>
            </FlexColumnCenterDiv>
            <div style={{marginBottom: "10px"}}>
                <Downloader tag='buddyresult'/>
            </div>
            <BuddyCheckComponent buddys={filtered} infos={select_char_data}/>
        </PageWrapper>
    )
}

export default BuddyPage