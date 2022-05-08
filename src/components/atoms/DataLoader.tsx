import { Button, Input, Modal } from 'antd'
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
    }
    margin-bottom: 8px;
`

/**
 * DataLoader
 * 
 * 체크리스트 사이트 데이터 캐시를 로컬에 저장하거나 
 * 해당 값을 바탕으로 데이터를 불러옵니다.
 */
function DataLoader() {

    // context load
    const { inven, setInven } = useContext(AnotherContext)
    
    // 유저가 입력한 데이터
    const [UserData, setUserData] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dataText = inven.join(",")

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const dataCopy = () => {
        navigator.clipboard.writeText(`${dataText}`)
        .then(()=>{
            Swal.fire({
            text: "Data Copied to Clipboard",
            width: 280,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
                popup: "alert",
            },
            });
        })
    }

    const dataLoad = () => {
        const newData = UserData.split(",").map(Number)
        window.localStorage.setItem("a_inv_new", UserData)
        setInven(newData)
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
    }

    return (
        <>
            <DataLoaderStyle onClick={showModal}>DataLoader</DataLoaderStyle>
            <Modal title="Data Copy &#38; Load" visible={isModalVisible} onCancel={handleCancel}
            okButtonProps={{ style: { display: 'none' } }}>
                <h2>Your Data</h2>
                <TextArea placeholder={dataText} disabled
                autoSize={{ minRows: 4, maxRows: 4 }}/>
                <br/><br/>
                <TextArea placeholder="new data here" value={UserData}
                onChange={(e) => setUserData(e.currentTarget.value)}
                autoSize={{ minRows: 4, maxRows: 4 }}/>
                <br/><br/>
                <Button style={{margin: 5}} type="primary" onClick={dataCopy}>COPY</Button>
                <Button style={{margin: 5}} type="primary" onClick={dataLoad} danger>LOAD</Button>
            </Modal>
        </>
    )
}

export default DataLoader
