import { ExclamationOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Popover, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { FlexColumnCenterDiv, PageWrapper } from '../../util/styles'

const colors = ["magenta", "volcano", "gold", "green", "cyan", "blue", "purple"]

/**
 * PersonalPage
 * 
 * 캐릭터 특성을 검색하는 페이지입니다.
 */
function PersonalPage() {

    // intl load
    const { formatMessage } = useIntl()
    
    /**
     * @param person_data: 퍼스널리티 데이터
     * @param Search : 퍼스널리티 검색 목록
     * @param Input : 검색어
     */ 
    const person_data: Array<PersonalityInfo> = require("../../data/personality.json")
    const [Search, setSearch] = useState([] as string[])
    const [Input, setInput] = useState("")

    const personalities = () => {
        let data: string[] = []
        person_data.forEach(a => {
            data = data.concat(a.personality)
        })
        return Array.from(new Set(data)).map(a => ( 
          { name: a,  value : formatMessage({id: a}) } 
      ))
    }

    // filtering
    const filtered = person_data.filter(item => {
        let temp = true;
        Search.forEach(b => {
            if(item.personality.indexOf(b) === -1)
                temp = false;
        })
        return temp;
    })

    // 엔터 시 자동완성 (불완전)
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement> | React.ChangeEvent<HTMLDivElement>) => {
        const {key} = (e as React.KeyboardEvent<HTMLInputElement>)
        const {target} = (e as React.ChangeEvent<HTMLInputElement>)
        if(key === "Enter") {
            const arr = personalities().filter(a => a.value.toUpperCase().includes(target.value.toUpperCase()))
            if(arr.length > 0) {
                setSearch(Array.from(new Set([...Search, arr[0].name])))
                setInput("")
            }
        }
    }

    const handleClose = (tag: string) => {
        setSearch(Search.filter(item => item !== tag))
    }

    const columns = [
        {
          title: formatMessage({id: "name"}),
          dataIndex: 'name',
          key: 'name',
          align: 'center' as 'center',
          width: 100
        },
        {
          title: formatMessage({id: "personality"}),
          dataIndex: 'personality',
          key: 'personality',
          align: 'center' as 'center',
          width: 200
        },
        {
          title: "",
          dataIndex: 'description',
          key: 'description',
          align: 'center' as 'center',
        }
    ];

    const datasets = filtered.map((info, index) => {
      return {
        name: <FlexColumnCenterDiv>
            <img alt="select"
                    src={`images/personality/${info.name}${info.is_extra ? "(ES)" : ""}.png`} 
                style={{width:50, borderRadius:3 }}/>
            <b>
                {formatMessage({id: info.name}) + (info.is_extra ? "(ES)" : "")}
            </b>
        </FlexColumnCenterDiv>,
        personality: <FlexColumnCenterDiv>
            <div>
              {info.personality.map((a,index) => (
                  <Tag style={{margin: '1px'}} color={colors[index%7]} key={index}>{formatMessage({id: a})}</Tag>
              ))}
            </div>
        </FlexColumnCenterDiv>,
        description: info.description ? <Popover content={<b style={{color: 'red'}}>{info.description}</b>}>
            <Button type="default" shape='circle' danger icon={<ExclamationOutlined />}/>
        </Popover> : null 
      }
    })

  return (
        <PageWrapper  style={{maxWidth: "900px", alignItems: "center"}}>
            <div style={{display: 'flex', maxWidth: '400px', flexWrap: 'wrap', margin: '10px 10px 10px 10px'}}>
                {Search.map((a, index) => (
                    <Tag style={{margin: '1px'}} color={colors[index%7]} key={index} closable 
                    onClose={(e) => {
                        e.preventDefault()
                        handleClose(a)
                    }}>
                        {formatMessage({id: a})}
                    </Tag>
                ))}
            </div>            
            <AutoComplete
                style={{ width: 250, marginBottom: '30px'}}
                options={personalities()}
                value={Input}
                filterOption={(inputValue, option) =>
                    option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                placeholder={formatMessage({id: "personality"})}
                onChange={(value: string) => setInput(value)}
                onSelect={(value: string) => {
                    const b = personalities().filter(a => a.value.toUpperCase() === value.toUpperCase()).map(a => a.name)
                    setSearch(Array.from(new Set([...Search, ...b])))
                    setInput("")
                }}
                onKeyDown={onKeyDown}
            />
            <Table dataSource={datasets} columns={columns} size="small" pagination={{ position: ["topLeft", "bottomLeft"] }} style={{
                minWidth: 300
            }}/>
        </PageWrapper>
  )
}

export default PersonalPage