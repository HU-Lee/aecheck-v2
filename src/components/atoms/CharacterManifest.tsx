import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Progress } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_MANIFEST_NEW, JAP_MANIFEST_NEW } from '../../data/config'
import { MANIFEST_STEPS } from '../../data/constant'
import { stylemark } from '../../util/commonComponent'
import { FlexColumnCenterDiv, ImageWrapper } from '../../util/styles'

/**
 * CharacterManifest
 * 캐릭터의 현현 진행도를 나타내는 Component입니다.
 * 
 * @param info  해당하는 캐릭터의 json data
 */
const CharacterManifest:React.FC<CharacterInfo> = (info) =>  {

    // intl, context load
    const { formatMessage } = useIntl()
    const { manifest, changeManifest, version } = useContext(AnotherContext)
    
    /**
     * @param maxStep       버전에 따른 현현 최대 진행도
     * @param currentStep   현재 현현 진행도
     */
    const maxStep = version==="japanese" ? MANIFEST_STEPS.indexOf(info.manifest_jap) : MANIFEST_STEPS.indexOf(info.manifest_glo)
    const [currentStep, setCurrentStep] = useState(Math.min(maxStep, Math.floor(manifest.filter(a => a%10000 === info.id)[0]/10000)) || 0)

    useEffect(() => {
        if (maxStep < currentStep) setCurrentStep(maxStep)
    }, [maxStep, currentStep])
    

    const onMinus = () => {
        const newStep = Math.max(0, currentStep-1)
        changeManifest(newStep, info.id)
        setCurrentStep(newStep)
    } 

    const onPlus = () => {
        const newStep = Math.min(maxStep, currentStep+1)
        changeManifest(newStep, info.id)
        setCurrentStep(newStep)
    } 

    // 새로 현현이 있는 캐릭터 강조표시
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
            <ImageWrapper>
                {stylemark(info)}
                <img alt="select" src={`images/character/${info.id}.png`} width={60}/>
            </ImageWrapper>
            <Progress percent={100*currentStep/maxStep} style={{width: "90%"}}/>
            <div style={{marginTop: 3, width: "90%", display: "flex", justifyContent: "space-between"}}>
                <Button.Group>
                    <Button onClick={onMinus}   icon={<MinusOutlined />} />
                    <Button onClick={onPlus}    icon={<PlusOutlined />} />
                </Button.Group>
                <b style={{margin: "5px", fontSize: "15px"}}>{currentStep > 0 ? formatMessage({id: MANIFEST_STEPS[currentStep]}) : MANIFEST_STEPS[currentStep]}</b>
            </div>
        </FlexColumnCenterDiv>
    )
}

export default CharacterManifest