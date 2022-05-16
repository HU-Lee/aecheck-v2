import { UnorderedListOutlined } from '@ant-design/icons';
import { Button, Drawer, Radio, Select, Divider } from 'antd';
import React, { useContext, useState } from 'react'
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AnotherContext } from '../../contexts';
import { GLO_VER, JAP_VER } from '../../data/config';
import { FlexColumnCenterDiv } from '../../util/styles';
import DataLoader from '../atoms/DataLoader';

const { Option } = Select;

const footer = <div>
    &copy; 2022. Made By <a href="https://github.com/HU-Lee" target="_blank" rel="noreferrer">HU-Lee</a>
</div>

const a_css = css`
    text-decoration: none;
    font-size: 16px;
    color: black;
    font-weight: 600;
    &:hover {
        color: #1890ff;
        transition: 0.5s;
    }
`

const SideMenu = styled(Link)`${a_css}`
const SideLink = styled.a`
    ${a_css}
    font-size: 13px;
`

/**
 * Sidebar
 * 
 * 메뉴를 표시하는 사이드바입니다.
 * 사이트 제목과 메뉴 버튼은 상단에 고정됩니다.
 */
function Sidebar() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { lang, version, changeLang, changeVersion } = useContext(AnotherContext)

    /**
     * @param visible: 사이드바의 표시 여부
     * @param path: 현재 주소. 사이드바 메뉴를 강조할 때 참조한다.
     */
    const [visible, setVisible] = useState(false);
    const path = window.location.pathname.replaceAll("/aetest", "")

    // 체크 관련 메뉴 옵션
    const check_endpoints = [
        {name: "Checklist", path: "/"},
        {name: "My Character", path: "/result"},
        {name: formatMessage({id: "manifest"}) + " (Beta)", path: "/manifest"}
    ]

    // 검색 관련 메뉴 옵션
    const dict_endpoints = [
        {name: formatMessage({id: "books"}) + " (Beta)", path: "/books"},
        {name: formatMessage({id: "personality"}) + " (Beta)", path: "/person"}
    ]

    return (
      <>
        <div 
            style={{
                display: "flex", 
                justifyContent: "center", 
                padding: "10px 20px 10px 20px", 
                backgroundColor: "#E1F6FF",
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99
            }}
        >
            <Button 
                type="primary" 
                shape='circle'
                size='large'
                icon={<UnorderedListOutlined/>} 
                onClick={() => setVisible(true)}
            />
            <div style={{flexGrow: 1, maxWidth: 1300, fontSize: 20, fontWeight: 600, lineHeight: "40px"}}>
                AE Check &#38; Tools
            </div>
        </div>
        <Drawer 
            title="AE Check &#38; Tools"
            width={250}
            placement="left" 
            onClose={() => setVisible(false)} 
            visible={visible} 
            footer={footer}
            bodyStyle={{display: 'flex', flexDirection: 'column'}}
        >
            <div style={{flexGrow: 1, display: 'flex', flexDirection: "column"}}>
                {check_endpoints.map((end, index) => (
                    <SideMenu key={index} to={end.path} onClick={() => setVisible(false)} style={{color: path===end.path ? "red" : ""}}>
                        {end.name}
                    </SideMenu>
                ))}
                <Divider/>
                {dict_endpoints.map((end, index) => (
                    <SideMenu key={index} to={end.path} onClick={() => setVisible(false)} style={{color: path===end.path ? "red" : ""}}>
                        {end.name}
                    </SideMenu>
                ))}
                <Divider/>
                <DataLoader/>
                <SideLink href="https://aecheck.tistory.com/" rel="noreferrer" target="_blank" style={{fontSize: "16px"}}>
                    Info Blog
                </SideLink>
                <Divider/>
                <SideLink href="https://hu-lee.github.io/anotherdungeon/" rel="noreferrer" target="_blank">
                    Another Dungeon (Unused)
                </SideLink>
            </div>          
            <FlexColumnCenterDiv style={{padding: 3}}>
                <b>Language</b>
                <Radio.Group 
                    defaultValue={lang} 
                    onChange={(e) => changeLang(e.target.value)}
                    style={{margin: "5px 0 15px 0"}}
                >
                    <Radio.Button value="ko">KOR</Radio.Button>
                    <Radio.Button value="jp">JAP</Radio.Button>
                    <Radio.Button value="en">ENG</Radio.Button>
                </Radio.Group>
                <b>Version</b>
                <Select defaultValue={version} onChange={(value: string) => changeVersion(value)} style={{minWidth: 100}}>
                    <Option value="global">GLOBAL ({GLO_VER})</Option>
                    <Option value="japanese">JAPAN ({JAP_VER})</Option>
                </Select>
            </FlexColumnCenterDiv>
        </Drawer>
      </>
    );
}

export default Sidebar