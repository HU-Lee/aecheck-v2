import { Col, Row, Select, Input, Button } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { AnotherContext } from '../../contexts'
import { GLO_NEW, JAP_NEW } from '../../data/config'
import { ELEMENTS, WEAPONS } from '../../data/constant'
import CheckComponent from '../organisms/CheckComponent'

const { Option } = Select;
const { Search } = Input;

/**
 * MainPage
 * 
 * 가장 처음 보게 되는 페이지로, 체크리스트가 표시됩니다. 
 */
function MainPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { data, version } = useContext(AnotherContext)

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
    const filtered = data.filter(e => SearchName==="" || formatMessage({id: e.code}).toLowerCase().includes(SearchName.toLowerCase()))
    .filter(e => Element===0 || Math.floor(e.category/10)===Element)
    .filter(e => Weapon===0 || Math.floor(e.category%10)===Weapon)
    .filter(e => {
        if(version==="japanese") return !e.gonly
        else return !e.jonly
    })

    // 버전의 신 캐릭터를 맨 앞으로 보내도록 sort
    if (version==="japanese") {
        filtered.sort((a,b) => !JAP_NEW.includes(a.code) ? 1 : -1)
    } else {
        filtered.sort((a,b) => !GLO_NEW.includes(a.code) ? 1 : -1)
    }

    return (
        <div style={{margin: "50px auto", width:"97%", maxWidth: "1400px", padding: "20px 0 20px 0"}}>
            <Link to={"/result"}>
                <Button 
                    shape='round' 
                    style={{ 
                        height: 45, 
                        width: 150, 
                        fontSize: "1.5rem", 
                        fontWeight: 600, 
                        margin: 5
                    }} 
                    type="primary" 
                >
                    Result
                </Button>
            </Link>
            <Row align="middle" justify="center" gutter={[10, 10]} style={{marginTop: "20px"}}>
                <Col span={24} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent: "center"}}>
                    <b>Filter</b>
                    <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}>
                        <Select defaultValue={0} onChange={(value: React.SetStateAction<number>) => setElement(value)} style={{width:"120px", margin:3}}>
                            {ELEMENTS.map(({id, element}) => (
                                <Option value={id} key={id}>{formatMessage({id: element})}</Option>
                            ))}
                        </Select>
                        <Select defaultValue={0} onChange={(value: React.SetStateAction<number>) => setWeapon(value)} style={{width:"120px", margin:3}}>
                            {WEAPONS.map(({id, weapon}) => (
                                <Option value={id} key={id}>{formatMessage({id: weapon})}</Option>
                            ))}
                        </Select>
                        <Search 
                            style={{width:"246px", margin: "0.2rem 8px 1rem 8px"}} 
                            placeholder="Search..." 
                            value={SearchName} 
                            onChange={HandleChange}
                            enterButton 
                            allowClear
                        />
                    </div>
                </Col>
            </Row>
            <CheckComponent data={filtered}/>
        </div>
    )
}

export default MainPage
