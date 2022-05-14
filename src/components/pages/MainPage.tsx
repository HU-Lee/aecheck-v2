import { Select, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { ELEMENTS, WEAPONS } from '../../data/constant'
import { directButtonLink } from '../../util/commonComponent'
import { new_char_to_top } from '../../util/function'
import { FlexColumnCenterDiv, PageWrapper } from '../../util/styles'
import CheckComponent from '../organisms/CheckComponent'

const { Option } = Select;
const { Search } = Input;

/**
 * MainPage
 * 
 * 가장 처음 보게 되는 페이지로, Checklist가 표시됩니다. 
 */
function MainPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { select_char_data, version } = useContext(AnotherContext)

    /**
     * @param Element: 선택한 속성
     * @param Weapon : 선택한 무기
     * @param SearchName : 캐릭터 검색어
     */
    const [Element, setElement] = useState(0)
    const [Weapon, setWeapon] = useState(0)
    const [SearchName, setSearchName] = useState("")

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    }

    // 설정값에 따라 데이터를 filter
    const filtered = select_char_data.filter(e => SearchName==="" || formatMessage({id: e.code}).toLowerCase().includes(SearchName.toLowerCase()))
    .filter(e => Element===0 || Math.floor(e.category/10)===Element)
    .filter(e => Weapon===0 || Math.floor(e.category%10)===Weapon)
    .filter(e => {
        if(version==="japanese") return !e.gonly
        else return !e.jonly
    })

    new_char_to_top(filtered, version)

    return (
        <PageWrapper style={{maxWidth: "1400px"}}>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                {directButtonLink("/result", "Result")}
                {directButtonLink("/manifest", formatMessage({id: "manifest"}))}
            </div>
            <FlexColumnCenterDiv style={{margin: "15px"}}>
                <b>Filter</b>
                <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}>
                    <Select defaultValue={0} onChange={(value: React.SetStateAction<number>) => setElement(value)} style={{width:"120px", margin: "5px"}}>
                        {ELEMENTS.map((element, idx) => (
                            <Option value={idx} key={idx}>{formatMessage({id: element})}</Option>
                        ))}
                    </Select>
                    <Select defaultValue={0} onChange={(value: React.SetStateAction<number>) => setWeapon(value)} style={{width:"120px", margin: "5px"}}>
                        {WEAPONS.map((weapon, idx) => (
                            <Option value={idx} key={idx}>{formatMessage({id: weapon})}</Option>
                        ))}
                    </Select>
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
            <CheckComponent infos={filtered}/>
        </PageWrapper>
    )
}

export default MainPage
