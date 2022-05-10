import styled from "styled-components";

// 캐릭터 아이콘 좌상단에 표시되는 스타일 마크의 styling
export const StylemarkStyle = styled.img`
    position: absolute;
    width: 30px;
    left: -6px;
    top: -6px;
    z-index: 3;
`

// 페이지를 감싸는 div element의 기본 styling
export const PageWrapper = styled.div`
    margin: 70px auto;
    width: 97%;
    padding: 20;
    display: flex;
    flex-direction: column;
`

// flexbox styling
export const FlexColumnCenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`