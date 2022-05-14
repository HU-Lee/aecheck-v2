import React from 'react'
import Downloader from '../atoms/Downloader'
import CharacterTable from '../molecules/CharacterTable'

/**
 * ResultManager
 * 
 * 결과를 관리하는 Component입니다.
 * 이미지 다운로더와 Table View로 구성되어 있습니다.
 */
function ResultManager() {
    return (
        <div style={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent: "center", marginBottom: '20px'}}>
            <Downloader tag='checkresult'/>
            <CharacterTable/>
        </div>
    )
}

export default ResultManager
