import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Progress } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_MANIFEST_NEW, JAP_MANIFEST_NEW } from '../../data/config'
import { MANIFEST_STEPS } from '../../data/constant'
import { stylemark } from '../../util/commonComponent'
import { FlexColumnCenterDiv } from '../../util/styles'

const CharacterManifest:React.FC<CharacterInfo> = (info) =>  {

    // intl, context load
    const { formatMessage } = useIntl()
    const { manifest, changeManifest, version } = useContext(AnotherContext)
    
    const steps = version==="japanese" ? MANIFEST_STEPS.indexOf(info.manifest_jap) : MANIFEST_STEPS.indexOf(info.manifest_glo)

    const [CurrentStep, setCurrentStep] = useState(Math.min(steps, Math.floor(manifest.filter(a => a%10000 === info.id)[0]/10000)) || 0)

    const onMinus = () => {
        const newStep = Math.max(0, CurrentStep-1)
        changeManifest(newStep, info.id)
        setCurrentStep(newStep)
    } 

    const onPlus = () => {
        const newStep = Math.min(steps, CurrentStep+1)
        changeManifest(newStep, info.id)
        setCurrentStep(newStep)
    } 

    // 새로 나온 캐릭터 강조표시
    const target_chars = version==="japanese" ? JAP_MANIFEST_NEW : GLO_MANIFEST_NEW
    const color = target_chars.includes(info.id) ? "red" : "lightblue"

    return (
        <FlexColumnCenterDiv
            style={{
                width: "100%",
                padding: "5px", 
                margin: '1px auto', 
                border: `2px solid ${color}`,
                borderRadius: "5px"
            }}
        >
            <b>
                {formatMessage({id: info.code})}({info.style.toUpperCase()})
                {color==="red" ? <b style={{color: "red"}}> (Update!)</b> : null}
            </b>
            <div style={{width:60, position: "relative", display: "inline-block", margin: 2}}>
                {stylemark(info)}
                <img alt="select" src={`images/character/${info.id}.png`} 
                style={{width:60, borderRadius:3 }}/>
            </div>
            <Progress percent={100/steps*CurrentStep} type="line" style={{width: "90%"}}/>
            <div style={{marginTop: 3, width: "90%", display: "flex", justifyContent: "space-between"}}>
                <Button.Group>
                    <Button onClick={onMinus} icon={<MinusOutlined />} />
                    <Button onClick={onPlus} icon={<PlusOutlined />} />
                </Button.Group>
                <b style={{margin: "5px", fontSize: "15px"}}>{CurrentStep > 0 ? formatMessage({id: MANIFEST_STEPS[CurrentStep]}) : MANIFEST_STEPS[CurrentStep]}</b>
            </div>
        </FlexColumnCenterDiv>
    )
}

export default CharacterManifest