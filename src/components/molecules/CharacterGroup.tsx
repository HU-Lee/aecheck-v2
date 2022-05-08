import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { AnotherContext } from '../../contexts'
import { GLO_NEW, JAP_NEW } from '../../data/config'
import { STYLES } from '../../data/constant'
import CharacterSelect from '../atoms/CharacterSelect'

/**
 * CharacterGroup
 * 
 * 체크리스트 부분의 캐릭터별 Component입니다.
 */
const CharacterGroup:React.FC<CharInfoProps> = ({data}) => {

    // intl, context load
    const { formatMessage } = useIntl()
    const { version } = useContext(AnotherContext)

    // style sort
    data.sort((a,b) => STYLES.indexOf(a.style) - STYLES.indexOf(b.style))

    // 새로 나온 캐릭터 강조표시
    const color = (version==="japanese" && JAP_NEW.includes(data[0].code)) || (version!=="japanese" && GLO_NEW.includes(data[0].code))
    ? "red" : "lightblue"

    return (
        <div
            style={{
                width: "100%",
                padding: "5px 2px 5px 2px", 
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
                {formatMessage({id: data[0].code})}
                {color==="red" ? <b style={{color: "red"}}> (Update!)</b> : null}
            </b>    
            <div style={{marginTop: 3}}>               
                {data.map(info => (
                    <CharacterSelect key={info.id} {...info}/>
                ))}
            </div>         
        </div>
    )
}

export default CharacterGroup
