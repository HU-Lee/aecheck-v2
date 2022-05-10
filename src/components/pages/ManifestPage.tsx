import { Collapse, Input } from 'antd';
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_MANIFEST_NEW, JAP_MANIFEST_NEW } from '../../data/config';
import { STYLES } from '../../data/constant';
import { directButtonLink } from '../../util/commonComponent';
import { PageWrapper } from '../../util/styles';
import CharacterManifest from '../atoms/CharacterManifest';
import CharacterResult from '../atoms/CharacterResult';

const { Search } = Input;
const { Panel } = Collapse;

const levels = ["-", "현현", "진현현"]

function ManifestPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { inven, manifest, data, version } = useContext(AnotherContext)

    /**
     * @param SearchName : 캐릭터 검색어
     */
    const [SearchName, setSearchName] = useState("")

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    }

    /**
     * @param MyCharacter: 가지고 있는 캐릭터의 정보. 출시되지 않은 데이터가 있는 경우 제외시킨다.
     */
     const MyCharacter: CharacterInfo[] = data.filter(info => inven.includes(info.id))
     .filter(e => {
         if(version==="japanese") return !e.gonly
         else return !e.jonly
     })
 
     // 한글, 속성 순으로 오름차순 정렬합니다.
     const sortArray = (array: CharacterInfo[]) => {
         array.sort(function(a, b) {
             return formatMessage({id: a.code}) < formatMessage({id: b.code}) ? -1 
                 : formatMessage({id: a.code}) > formatMessage({id: b.code}) ? 1
                 : 0;
         });
         array.sort(function(a, b) {
             return Math.floor(a.category/10) - Math.floor(b.category/10)
         });
     }

     // 클래스 체인지 가능 캐릭터를 계산하는 함수 (스타일에 따라)
    const renderCC = (style: string) => {
        let tempIds = [] as number[]
        MyCharacter.forEach((a) => {
            tempIds = tempIds.concat(a?.change || [])
        })
        const parsedIds = Array.from(new Set(tempIds)).filter(id => !inven.includes(id))
        const parsedData = data.filter(info => info.style===style && parsedIds.includes(info.id))

        sortArray(parsedData)

        return parsedData.map(a => a.id)
    }

    const getError = (target: CharacterInfo) => {
        if (target.style !== "ns") {
            if (inven.includes(target.id)) return null
            else if (renderCC(target.style).includes(target.id)) return "manifest_error2"
            else return "manifest_error3"
        } else {
            const styles = MyCharacter.filter(a => a.code === target.code).map(a => a.style)
            if (styles.includes("ns")) return null
            else if (!styles.includes("4.5")) {
                return renderCC(target.style).includes(target.id) ? "manifest_error2" : "manifest_error3"
            } else {
                return styles.includes("as") || styles.includes("es") ? null : "manifest_error2"
            }
        }
    }

    // 설정값에 따라 데이터를 filter
    const filtered = data.filter(e => SearchName==="" || formatMessage({id: e.code}).toLowerCase().includes(SearchName.toLowerCase()))
    .filter(e => {
        if(version==="japanese") return e.manifest_jap !== "없음"
        else return e.manifest_glo !== "없음"
    })

    // style sort
    filtered.sort((a,b) => {
        if (a.code !== b.code) return a.code > b.code ? 1 : -1
        else return STYLES.indexOf(a.style) - STYLES.indexOf(b.style)
    })

    // 버전의 신 캐릭터를 맨 앞으로 보내도록 sort
    if (version==="japanese") {
        filtered.sort((a,b) => !JAP_MANIFEST_NEW.includes(a.id) ? 1 : -1)
    } else {
        filtered.sort((a,b) => !GLO_MANIFEST_NEW.includes(a.id) ? 1 : -1)
    }

    return (
        <PageWrapper style={{maxWidth: "1200px"}}>
            {directButtonLink("/", "Back to Checklist")}
            <Search 
                style={{width:"250px", margin: "10px auto"}} 
                placeholder="Search..." 
                value={SearchName} 
                onChange={HandleChange}
                enterButton
                allowClear
            />
            <div 
                style={{
                    padding: "3px",
                    display: "grid",
                    gap: "2px 2px",
                    gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
                    justifyContent: "center"
                }}
            >
                {filtered.map(info => {
                    if (getError(info)) return null
                    const steps = version==="japanese" ? levels.indexOf(info.manifest_jap) : levels.indexOf(info.manifest_glo)
                    console.log(manifest.find(a => a%10000 === info.id) || 0 , steps*10000 + info.id, info.book)
                    if ((manifest.find(a => a%10000 === info.id) || 0) >= steps*10000 + info.id) return null
                    else return <CharacterManifest key={info.id} {...info}/>
                })}
            </div>
            <Collapse defaultActiveKey={['3', "4"]} style={{fontSize: "1rem", fontWeight: 600}}>
                <Panel header="Complete" key="2">
                    <div 
                        style={{
                            padding: "3px",
                            display: "grid",
                            gap: "2px 2px",
                            gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
                            justifyContent: "center"
                        }}
                    >
                        {filtered.map(info => {
                            if (getError(info)) return null
                            const steps = version==="japanese" ? levels.indexOf(info.manifest_jap) : levels.indexOf(info.manifest_glo)
                            if ((manifest.find(a => a%10000 === info.id) || 0) < steps*10000 + info.id) return null
                            else return <CharacterManifest key={info.id} {...info}/>
                        })}
                    </div>
                </Panel>
                <Panel header={formatMessage({id: "manifest_error2"})} key="3">
                    {filtered.filter(a => getError(a) === "manifest_error2").map((info, index) => (
                        <CharacterResult key={index} {...info}/>
                    ))}
                </Panel>
                <Panel header={formatMessage({id: "manifest_error3"})} key="4">
                    {filtered.filter(a => getError(a) === "manifest_error3").map((info, index) => (
                        <CharacterResult key={index} {...info}/>
                    ))}
                </Panel>
            </Collapse>
        </PageWrapper>
    )
}

export default ManifestPage