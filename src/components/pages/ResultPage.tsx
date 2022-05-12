import { Collapse, Row, Col, Divider } from 'antd';
import React, { useContext } from 'react'
import { useIntl } from 'react-intl';
import { AnotherContext } from '../../contexts'
import { ELEMENTS, STYLES } from '../../data/constant';
import { directButtonLink } from '../../util/commonComponent';
import { PageWrapper } from '../../util/styles';
import CharacterResult from '../atoms/CharacterResult';
import ResultManager from '../organisms/ResultManager';

const { Panel } = Collapse;

/**
 * ResultPage
 * 
 * 체크리스트를 토대로 여러 유용한 결과를 표시해 줍니다.
 */
function ResultPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { select_char_data, char_codes, inven, version } = useContext(AnotherContext)

    // result_char_data : 단어순 + 속성 정렬
    const result_char_data = [...select_char_data].sort(function(a, b) {
      return formatMessage({id: a.code}) < formatMessage({id: b.code}) ? -1 
           : formatMessage({id: a.code}) > formatMessage({id: b.code}) ? 1 : 0;
    }).sort(function(a, b) {
      return Math.floor(a.category/10) - Math.floor(b.category/10)
    });
    
    /**
     * @param MyCharacter: 가지고 있는 캐릭터의 정보. 출시되지 않은 데이터가 있는 경우 제외시킨다.
     */
    const MyCharacter: CharacterInfo[] = result_char_data.filter(info => inven.includes(info.id))
    .filter(e => {
        if(version==="japanese") return !e.gonly
        else return !e.jonly
    })

    // 명함도 없는 캐릭터를 계산하는 함수 (배포 여부에 따라)
    const renderNo = (free: boolean) => {
        // 1.   없는 캐릭터들의 코드 배열을 계산
        const parsedCodes = char_codes.filter(code => !MyCharacter.map(a => a.code).includes(code))

        // 2.   배열 필터링 : 맨 첫 번째고, 배포 여부가 설정된 값과 같은 경우를 반환 
        //      + 출시되지 않은 데이터가 있는 경우 제외시킨다.
        const parsedData = result_char_data.filter(info => parsedCodes.includes(info.code) && info.first && info.free === free)
        .filter(e => {
            if(version==="japanese") return !e.gonly
            else return !e.jonly
        })

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    // 4.5성만 있는 캐릭터를 계산하는 함수 (배포 여부에 따라)
    const render45 = (free: boolean) => {
        // 1.   4.5성만 있는 캐릭터들의 코드 배열을 계산
        const parsedCodes = char_codes.filter(code => JSON.stringify(MyCharacter.filter(a => a.code===code).map(a => a.style)) === `["4.5"]`)
        
        // 2.   배열 필터링 : 배포 여부가 설정된 값과 같은 경우를 반환 
        //      + 출시되지 않은 데이터가 있는 경우 제외시킨다.
        const parsedData = MyCharacter.filter(info => parsedCodes.includes(info.code) && info.free === free)
        .filter(e => {
            if(version==="japanese") return !e.gonly
            else return !e.jonly
        })

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    // 클래스 체인지 가능 캐릭터를 계산하는 함수 (스타일에 따라)
    const renderCC = (style: string) => {
        // 1. 가지고 있는 캐릭터들의 CC 목록을 전부 합친다.
        let tempIds = [] as number[]
        MyCharacter.forEach((a) => {
            tempIds = tempIds.concat(a.change)
        })

        // 2. 인벤에 없고 스타일이 설정된 값과 같은 경우를 반환 
        const parsedIds = Array.from(new Set(tempIds)).filter(id => !inven.includes(id))
        const parsedData = result_char_data.filter(info => info.style===style && parsedIds.includes(info.id))

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }

    // 속성별 보유 캐릭터를 계산하는 함수
    const renderElement = (element: number) => {
        // 4.5성은 제외
        const parsedData = MyCharacter.filter(info => element === Math.floor(info.category/10) && info.style !== "4.5")

        return parsedData.map((info, index) => (
            <CharacterResult key={index} {...info}/>
        ))
    }
    

    return (
        <PageWrapper style={{maxWidth: "1100px"}}>
            {directButtonLink("/", "Back to Checklist")}
            <Divider style={{margin: 5}}/>
            <ResultManager/>
            <div id="checkresult">
                <Collapse defaultActiveKey={['1', '2', '3', '4']} style={{fontSize: "1rem", fontWeight: 600}}>
                    <Panel header={`${formatMessage({id: "resultmenu1"})} (${renderNo(false).length} + ${renderNo(true).length})`} key="1">
                        <Row justify="center" align="middle" style={{marginBottom:"30px"}}>
                            <Col xs={24} sm={4}><b>Not Free</b></Col>
                            <Col xs={23} sm={20}>{renderNo(false)}</Col>
                            <Divider style={{margin: 15}}/>
                            <Col xs={24} sm={4}><b>Free</b></Col>
                            <Col xs={23} sm={20}>{renderNo(true)}</Col>
                        </Row>
                    </Panel>
                    <Panel header={`${formatMessage({id: "resultmenu2"})} (${render45(false).length} + ${render45(true).length})`} key="2">
                        <Row justify="center" align="middle" style={{marginBottom:"30px"}}>
                            <Col xs={24} sm={4}><b>Not Free</b></Col>
                            <Col xs={23} sm={20}>{render45(false)}</Col>
                            <Divider style={{margin: 15}}/>
                            <Col xs={24} sm={4}><b>Free</b></Col>
                            <Col xs={23} sm={20}>{render45(true)}</Col>
                        </Row>
                    </Panel>
                    <Panel header={formatMessage({id: "resultmenu3"})} key="3">
                        <Row align="middle" justify="center" style={{marginTop: "5px"}}>
                            {STYLES.slice(1).map(style => (
                                <React.Fragment key={style}>
                                    <Col xs={24} sm={4}>
                                        <img src={`images/category/${style}.png`} alt={style} width="40"/>
                                    </Col>
                                    <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"5px"}}>
                                        {renderCC(style)}
                                    </Col>
                                    {style !== "es" ? <Divider style={{margin: 15}}/> : null}
                                </React.Fragment>
                            ))}     
                        </Row>
                    </Panel>
                    <Panel header={formatMessage({id: "resultmenu4"})} key="4">
                        {ELEMENTS.slice(1).map((element, idx) => (
                            <Row key={idx} align="middle" justify="center" style={{marginBottom:"5px"}}>
                                <Col xs={24} sm={4}>
                                    {element === "etc" ? <>
                                        <b>Lunatic</b><br/>
                                        <b>+</b><br/>
                                    </> : null}
                                    <img alt={element} src={`images/category/${element}.png`} width="40"/>
                                </Col>
                                <Col xs={23} sm={20} style={{textAlign: "left"}}>
                                    {renderElement(idx+1)}
                                </Col>
                                {element !== "etc" ? <Divider style={{margin: "15px auto"}}/> : null}
                            </Row>
                        ))}
                    </Panel>
                </Collapse>
            </div>
        </PageWrapper>
    )
}

export default ResultPage
