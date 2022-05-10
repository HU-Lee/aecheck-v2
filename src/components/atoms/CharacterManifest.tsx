import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Progress } from 'antd'
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_MANIFEST_NEW, JAP_MANIFEST_NEW } from '../../data/config'
import { MANIFEST_STEPS } from '../../data/constant'
import { stylemark } from '../../util/commonComponent'

const CharacterManifest:React.FC<CharacterInfo> = (data_manifest) =>  {

    // intl, context load
    const { formatMessage } = useIntl()
    const { manifest, changeManifest, version } = useContext(AnotherContext)
    
    const steps = version==="japanese" ? MANIFEST_STEPS.indexOf(data_manifest.manifest_jap) : MANIFEST_STEPS.indexOf(data_manifest.manifest_glo)

    const [CurrentStep, setCurrentStep] = useState(Math.min(steps, Math.floor(manifest.filter(a => a%10000 === data_manifest.id)[0]/10000)) || 0)

    const onMinus = () => {
        const newStep = Math.max(0, CurrentStep-1)
        changeManifest(newStep, data_manifest.id)
        setCurrentStep(newStep)
    } 

    const onPlus = () => {
        const newStep = Math.min(steps, CurrentStep+1)
        changeManifest(newStep, data_manifest.id)
        setCurrentStep(newStep)
    } 

    // 새로 나온 캐릭터 강조표시
    const color = (version==="japanese" && JAP_MANIFEST_NEW.includes(data_manifest.id)) || (version!=="japanese" && GLO_MANIFEST_NEW.includes(data_manifest.id))
    ? "red" : "lightblue"

    return (
        <div
            style={{
                width: "100%",
                padding: "5px", 
                margin: '1px auto', 
                display: 'flex', 
                flexDirection: "column",
                justifyContent: 'center', 
                alignItems: 'center',
                border: `2px solid ${color}`,
                borderRadius: "5px"
            }}
        >
            <b>
                {formatMessage({id: data_manifest.code})}({data_manifest.style.toUpperCase()})
                {color==="red" ? <b style={{color: "red"}}> (Update!)</b> : null}
            </b>    
            <div style={{marginTop: 3, display: "flex", flexDirection: "column"}}>               
                <div style={{width:60, position: "relative", display: "inline-block", margin: 2}}>
                        {stylemark(data_manifest)}
                        <img alt="select" src={`images/character/${data_manifest.id}.png`} 
                        style={{width:60, borderRadius:3 }}/>
                </div>
            </div>
            <Progress percent={100/steps*CurrentStep} type="line"/>
            <div style={{marginTop: 3, width: "90%", display: "flex", justifyContent: "space-between"}}>
                <Button.Group>
                    <Button onClick={onMinus} icon={<MinusOutlined />} />
                    <Button onClick={onPlus} icon={<PlusOutlined />} />
                </Button.Group>
                <b style={{margin: "5px", fontSize: "15px"}}>{CurrentStep > 0 ? formatMessage({id: MANIFEST_STEPS[CurrentStep]}) : MANIFEST_STEPS[CurrentStep]}</b>
            </div>
        </div>
    )
}

export default CharacterManifest