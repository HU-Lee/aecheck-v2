import { Collapse, Divider } from 'antd';
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { MANIFEST_STEPS } from '../../data/constant';
import { directButtonLink, emptyImage } from '../../util/commonComponent';
import { new_manifest_to_top } from '../../util/function';
import { GridDiv, PageWrapper } from '../../util/styles';
import CharacterManifest from '../atoms/CharacterManifest';
import CharacterResult from '../atoms/CharacterResult';

const { Panel } = Collapse;

function ManifestPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { inven, manifest, select_char_data, version } = useContext(AnotherContext)

    
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

     // 클래스 체인지 가능 캐릭터 id 배열을 계산하는 함수
    const render_cc_id = () => {
        let tempIds = [] as number[]
        MyCharacter.forEach((a) => {
            tempIds = tempIds.concat(a?.change || [])
        })
        return Array.from(new Set(tempIds)).filter(id => !inven.includes(id))
    }

    const get_manifest_status = (target: CharacterInfo) => {
        // 1. 해당 캐릭터가 있으면 끝
        if (inven.includes(target.id)) return "ok"
        
        if (target.style !== "ns") {
            // 2-1. ns가 아닌 경우 CC가 가능하면 끝.
            if (render_cc_id().includes(target.id)) return "manifest_error2" // 클래스 체인지가 필요합니다.
            else return "manifest_error3" // 캐릭터를 보유하고 있지 않습니다.
        } else {
            // 2-2. ns인 경우 스타일을 다 봐야함.
            const styles = MyCharacter.filter(a => a.code === target.code).map(a => a.style)
            if (!styles.includes("4.5")) {
                // 4.5가 없으면 CC or 보유하지 않은 것
                return render_cc_id().includes(target.id) ? "manifest_error2" : "manifest_error3"
            } else {
                // 4.5가 있고 다른 스타일이 있으면 현현이 가능함. 아니면 CC
                return styles.includes("as") || styles.includes("es") ? "ok" : "manifest_error2"
            }
        }
    }

    // 설정값에 따라 데이터를 filter
    const filtered = result_char_data.filter(e => {
        if(version==="japanese") return e.manifest_jap !== "없음"
        else return e.manifest_glo !== "없음"
    })

    new_manifest_to_top(filtered, version)

    // 현현 완료 / 미완료 목록
    const manifest_incomplete = filtered.filter(a => (get_manifest_status(a) === "ok"))
    .filter(a => {
        const steps = version==="japanese" ? MANIFEST_STEPS.indexOf(a.manifest_jap) : MANIFEST_STEPS.indexOf(a.manifest_glo)
        return (manifest.find(b => b%10000 === a.id) || 0) < steps*10000 + a.id
    })
    const manifest_complete = filtered.filter(a => (get_manifest_status(a) === "ok"))
    .filter(a => {
        const steps = version==="japanese" ? MANIFEST_STEPS.indexOf(a.manifest_jap) : MANIFEST_STEPS.indexOf(a.manifest_glo)
        return (manifest.find(b => b%10000 === a.id) || 0) >= steps*10000 + a.id
    })

    return (
        <PageWrapper style={{maxWidth: "1200px"}}>
            {directButtonLink("/", "Back to Checklist")}
            <Divider style={{margin: 5}}/>
            <GridDiv>
                {manifest_incomplete.length > 0 ? manifest_incomplete.map(info => <CharacterManifest key={info.id} {...info}/>) : emptyImage}
            </GridDiv>
            <Collapse defaultActiveKey={['3', "4"]} style={{fontSize: "1rem", fontWeight: 600}}>
                <Panel header="Complete" key="2">
                    <GridDiv>
                        {manifest_complete.length > 0 ? manifest_complete.map(info => <CharacterManifest key={info.id} {...info}/>) : emptyImage}
                    </GridDiv>
                </Panel>
                <Panel header={formatMessage({id: "manifest_error2"})} key="3">
                    {filtered.filter(a => get_manifest_status(a) === "manifest_error2").map((info, index) => (
                        <CharacterResult key={index} {...info}/>
                    ))}
                </Panel>
                <Panel header={formatMessage({id: "manifest_error3"})} key="4">
                    {filtered.filter(a => get_manifest_status(a) === "manifest_error3").map((info, index) => (
                        <CharacterResult key={index} {...info}/>
                    ))}
                </Panel>
            </Collapse>
        </PageWrapper>
    )
}

export default ManifestPage