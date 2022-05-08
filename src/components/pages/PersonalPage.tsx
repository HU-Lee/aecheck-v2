import { ExclamationOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Popover, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

const colors = ["magenta", "volcano", "gold", "green", "cyan", "blue", "purple"]

function PersonalPage() {

    // intl, context load
    const { formatMessage } = useIntl()
    
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

    const filtered = person_data.filter(item => {
        let temp = true;
        Search.forEach(b => {
            if(item.personality.indexOf(b) === -1)
                temp = false;
        })
        return temp;
    })

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
        name: <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img alt="select"
                    src={`images/personality/${info.name}${info.is_extra ? "(ES)" : ""}.png`} 
                style={{width:50, borderRadius:3 }}/>
            <b>
                {formatMessage({id: info.name}) + (info.is_extra ? "(ES)" : "")}
            </b>
        </div>,
        personality: <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div>
              {info.personality.map((a,index) => (
                  <Tag style={{margin: '1px'}} color={colors[index%7]} key={index}>{formatMessage({id: a})}</Tag>
              ))}
            </div>
        </div>,
        description: info.description ? <Popover content={<b style={{color: 'red'}}>{info.description}</b>}>
            <Button type="default" shape='circle' danger icon={<ExclamationOutlined />}/>
        </Popover> : null 
      }
    })

  return (
      <div style={{paddingTop: "1rem", textAlign: 'center', display: 'flex',
                   flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                   maxWidth: '1500px', margin: '50px auto'}}>
          <h1>{formatMessage({id: "personality"})}</h1>
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
              placeholder="Search..."
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
      </div>
  )
}

export default PersonalPage