import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd"
import { signInFunc, signUpFunc } from "../../api/api"
import { useNavigate } from "react-router";



// types for form fields
type FieldTypeSignup = {
    username: string;
    password: string;
    full_name: string;
};
type FieldTypeSignin = Omit<FieldTypeSignup, 'full_name'>


// type 4 comp props
type TFormProps = {
    role: 'signin' | 'signup' // or use useLocation instead
}


// type 4 status
type TStatus = 'uninitialized' | 'loading' | 'success' | 'error'



const AuthForm: React.FC<TFormProps> = ({ role }) => {

    const [status, setStatus] = useState<TStatus>('uninitialized')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const nav = useNavigate();

    // submit 4 signin & signup
    const submitHandler = async <T extends FieldTypeSignin | FieldTypeSignup>(fields: T, func: (fields: T) => Promise<{ isSuccess: boolean, message?: string }>) => {
        setStatus('loading');
        const res = await func(fields);
        if (res.isSuccess) {
            setStatus('success')
        } else {
            setStatus('error')
            res.message && setErrorMsg(res.message)
        }

    }

    // redirects
    useEffect(() => {
        if (role === 'signup' && status === 'success') {
            nav('/signin')
        }

        if (role === 'signin' && status === 'success') {
            nav('/')
        }
    }, [status])


    return (
        <>
            {/* Modal for errors */}
            <Modal
                open={status === 'error'}
                onCancel={() => { setErrorMsg(''); setStatus('uninitialized') }}
                footer=''
            >
                <div>
                    {errorMsg}
                </div>

            </Modal>
            <Form
                style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}
                autoComplete="off"
                onFinish={(fields) => { role === 'signin' ? submitHandler(fields, signInFunc) : submitHandler(fields, signUpFunc) }} // conditions for submit
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: 'Обязательное поле!' }
                    ]}
                >
                    <Input
                        placeholder='Имя пользователя'
                    />
                </Form.Item>
                {role === 'signup' &&
                    <Form.Item
                        name="full_name"
                        rules={[
                            { required: true, message: 'Обязательное поле!' }
                        ]}
                    >
                        <Input
                            placeholder='Имя пользователя'
                        />
                    </Form.Item>
                }
                <Form.Item
                    name='password'
                    rules={[
                        { required: true, message: 'Обязательное поле!' },
                        { min: 8, message: '8 символов' }
                    ]}
                >
                    <Input
                        placeholder='Пароль'
                        type="password"
                    />
                </Form.Item>
                <Button
                    disabled={status === 'loading'}
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100px' }}
                >Отправить</Button>
            </Form>
        </>
    )
}

export default AuthForm;