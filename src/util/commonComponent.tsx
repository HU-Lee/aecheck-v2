import { Button, Empty } from "antd";
import { Link } from "react-router-dom";
import { StylemarkStyle } from "./styles";

/**
 * stylemark
 * 
 * 캐릭터 아이콘 좌상단에 표시되는 스타일 마크
 * @param data : 해당하는 캐릭터의 json data
 */ 
export const stylemark = (data: CharacterInfo) => (
    data.style !== "4.5" ? <StylemarkStyle src={`images/category/${data.style}.png`}/> : null
)

/**
 * directButtonLink
 * 
 * 페이지 상단에 배치하여 페이지 간 이동을 편하게 할 링크 버튼
 * @param endpoint : 목표 페이지의 endpoint
 * @param text : 버튼에 적을 문구
 */ 
export const directButtonLink = (endpoint: string, text: string) => (
    <Link to={endpoint}>
        <Button 
            shape='round' 
            style={{ 
                height: 45, 
                width: 220, 
                fontSize: "1.5rem", 
                fontWeight: 600, 
                margin: 5,
                marginTop: "5px"
            }} 
            type="primary" 
        >
            {text}
        </Button>
    </Link>
)

/**
 * emptyImage
 * 
 * 데이터가 없을 때 표시할 이미지
 */ 
export const emptyImage = (
    <Empty image="images/nodata.png" style={{margin: 20}}/>
)