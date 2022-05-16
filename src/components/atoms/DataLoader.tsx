import { Button, Checkbox, Input, Modal } from 'antd'
import React, { useContext, useState} from 'react'
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { AnotherContext } from '../../contexts';

const { TextArea } = Input;

const DataLoaderStyle = styled.div`
    text-decoration: none;
    font-size: 16px;
    color: black;
    font-weight: 600;
    &:hover {
        color: #1890ff;
        transition: 0.5s;
        cursor: pointer;
    }
    margin-bottom: 8px;
`

// 기존 데이터와 현재 데이터를 match시켜주는 데이터
const convert_data = require("../../data/old_to_new.json")

/**
 * DataLoader
 * 
 * 체크리스트 사이트 데이터를 로컬에 저장하거나 
 * 텍스트 데이터를 바탕으로 데이터를 불러옵니다.
 */
function DataLoader() {

    // context load
    const { inven, setInven, manifest, setManifest } = useContext(AnotherContext)
    
    /**
     * @param UserData          유저가 입력한 데이터
     * @param isOld             데이터의 구 버전 여부 (2022.5.02 이전)
     * @param isModalVisible    모달의 보임 여부
     */
    const [UserData, setUserData] = useState("")
    const [isOld, setIsOld] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 현재 데이터를 txt 파일로 다운로드
    // https://stackoverflow.com/questions/61237355/how-to-save-my-input-values-to-text-file-with-reactjs
    const dataSave = () => {
        const jsonString = JSON.stringify({
            inven: inven,
            manifest: manifest
        })
        const element = document.createElement("a");
        const file = new Blob([jsonString], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "AEdata.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    // 텍스트를 캐시에 저장하고 사이트 데이터를 갱신
    const dataLoad = () => {
        try {
            if (isOld) {
                const oldData = UserData.split(",").map(a => convert_data[a] || -1)
                window.localStorage.setItem("a_inv_new", oldData.join(","))
                setInven(oldData)
            } else {
                const newData: SaveData = JSON.parse(UserData.trim())
    
                window.localStorage.setItem("a_inv_new", newData.inven.join(","))
                setInven(newData.inven)
                window.localStorage.setItem("a_man", newData.manifest.join(","))
                setManifest(newData.manifest)
            }
            Swal.fire({
                text: "Data Load Success",
                width: 280,
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    popup: "alert",
                },
            }).then(() => {
                window.location.reload()
            })
        } catch (error) {
            Swal.fire({
                text: "Data Load Error",
                width: 280,
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    popup: "alert",
                },
            })
        }
    }

    return (
        <>
            <DataLoaderStyle onClick={showModal}>DataLoader</DataLoaderStyle>
            <Modal 
                title="Data Copy &#38; Load" 
                visible={isModalVisible} 
                onCancel={handleCancel}
                okButtonProps={{ style: {display: 'none'} }}
            >
                <TextArea placeholder="New data here" value={UserData}
                onChange={(e) => setUserData(e.currentTarget.value)}
                autoSize={{ minRows: 4, maxRows: 4 }}/>
                <br/><br/>
                <Checkbox onChange={() => setIsOld(!isOld)}>Old Data (~22.05.02)</Checkbox>
                <br/><br/>
                <Button style={{margin: 5}} type="primary" onClick={dataSave}>SAVE TXT</Button>
                <Button style={{margin: 5}} type="primary" onClick={dataLoad} danger>LOAD</Button>
            </Modal>
        </>
    )
}

export default DataLoader
