import React from 'react'
import CharacterGroup from '../molecules/CharacterGroup'

/**
 * CheckComponent
 * 
 * MainPage의 필터를 제외한 체크리스트 부분입니다.
 */
const CheckComponent:React.FC<CharInfoProps> = ({data}) => {

    const codes = Array.from(new Set(data.map(a => a.code)))

    return (
        <div 
            style={{
                padding: "3px",
                display: "grid",
                gap: "2px 2px",
                gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
                justifyContent: "center"
            }}
        >
            {codes.map(code => (
                <CharacterGroup data={data.filter(a => a.code === code)} key={code}/>
            ))}
        </div>
    )
}

export default CheckComponent

