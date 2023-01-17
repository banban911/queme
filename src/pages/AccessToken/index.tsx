import {Button, Input, notification} from "antd";
import {useState} from "react";
import {observer} from "mobx-react";


const AccessToken = () => {
    type NotificationType = 'success' | 'info' | 'warning' | 'error';
    const [api, contextHolder] = notification.useNotification();
    const openNotif = (type: NotificationType) => {
        api[type]({
            message: 'Token added successfully',
            description:
                'You can call authenticated APIs now',
        });
    };

    const [token, setToken] = useState('')
    const handleSubmit = () => {
        localStorage.setItem('gh-token', JSON.stringify(token))
        setToken('')
        openNotif('success')
        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    const handleChange = (e: any) => {
        setToken(e.target.value)
    }
    return (
        <>
            {contextHolder}
            <Input.Group compact>
                <Input
                    placeholder="Enter your github personal token"
                    allowClear
                    onChange={(e) => handleChange(e)}
                    onPressEnter={handleSubmit}
                    value={token}
                    style={{width: 300}}
                />
                <Button type='primary' onClick={handleSubmit}>Add token</Button>
            </Input.Group>
        </>
    )
}

export default observer(AccessToken)