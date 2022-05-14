import React, { useContext, useState } from 'react'
import { Input, Button, Table } from 'antd'
import { AnotherContext } from '../../contexts';
import { useIntl } from 'react-intl';
import { FlexColumnCenterDiv, PageWrapper } from '../../util/styles';

const { Search } = Input;

/**
 * BookPage
 * 
 * 직업서를 검색하는 페이지입니다.
 */
function BookPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    const { select_char_data } = useContext(AnotherContext)

    /**
     * @param dungeon_link_data: 던전 이름과 알테마 링크를 매칭시킨 데이터
     * @param SearchName : 검색어
     */ 
    const dungeon_link_data: Array<DungeonLinkInfo> = require("../../data/dungeon.json")
    const [SearchName, setSearchName] = useState("")

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    }

    // 설정값에 따라 데이터를 filter. 이름 또는 직업서 둘 중 하나만 해당되면 된다.
    const filtered = select_char_data.filter(e => e.book !== "없음")
    .filter(e => SearchName==="" 
        || (formatMessage({id: e.code}) + `(${e.style})`).toLowerCase().includes(SearchName.toLowerCase()) 
        || formatMessage({id: e.book}).toLowerCase().includes(SearchName.toLowerCase())
    )

    const columns = [
        {
          title: formatMessage({id: "name"}),
          dataIndex: 'name',
          key: 'name',
          align: 'center' as 'center',
          width: 100
        },
        {
          title: formatMessage({id: "books"}),
          dataIndex: 'book',
          key: 'book',
          align: 'center' as 'center',
          width: 150
        },
        {
          title: formatMessage({id: "source"}),
          dataIndex: 'source',
          key: 'source',
          align: 'center' as 'center',
        },
    ];

    const datasets = filtered.map((info, index) => ({
        name: <FlexColumnCenterDiv>
            <img alt="select" src={`images/character/${info.id}.png`} width={50}/>
            <b style={ SearchName!=="" && (formatMessage({id: info.code}) + `(${info.style})`).toLowerCase().includes(SearchName.toLowerCase()) ? {
                color: "red"
            } : undefined}>
                {(formatMessage({id: info.code}) + `(${info.style.toUpperCase()})`)}
            </b>
        </FlexColumnCenterDiv>,
        book: <b style={ SearchName!=="" && formatMessage({id: info.book}).toLowerCase().includes(SearchName.toLowerCase()) ? {
            color: "red"
        } : undefined}>
            {formatMessage({id: info.book})}
        </b>,
        source: <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
        }}>
            {info.book_get.map((g, index) => (
                ["이절", "개전", "경전록"].includes(g) ? <b key={index}>{formatMessage({id: g})}</b> : 
                <a href={`https://altema.jp/anaden/${dungeon_link_data.find(a => a.name === g)?.endpoint}`} rel="noreferrer" target="_blank" key={index}>
                    <Button style={{fontSize: '12px', margin: '1px'}}>{formatMessage({id: g})}</Button>
                </a>
            ))}
        </div>
    }))

    return (
        <PageWrapper  style={{maxWidth: "900px", alignItems: "center"}}>
            <Search 
                style={{width:"250px", margin: "0.2rem 8px 1rem 8px"}} 
                placeholder={`${formatMessage({id: "name"})}, ${formatMessage({id: "books"})}`}
                value={SearchName} 
                onChange={HandleChange}
                enterButton
                allowClear
            />
            <Table dataSource={datasets} columns={columns} size="small" pagination={{ position: ["topLeft", "bottomLeft"] }}/>
        </PageWrapper>
    )
}

export default BookPage