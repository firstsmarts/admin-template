import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    Icon,
    Form,
    Input,
    Checkbox,
    Button,
    Modal,
    message
} from '@antd'
import './index.css'
import {connect} from 'react-redux'
const FormItem = Form.Item

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forget: false,
            loading: false
        }
        this.forget = () => {
            this.setState({forget: true})
        }
        this.cancelForget = () => {
            this.setState({forget: false})
        }
        this.doLogin = () => {
            console.log(1)
            this.setState({loading: true})

            setTimeout(() => {
                this.setState({loading: false})
                message.success('登陆成功')
                this.props.history.replace('/')
            }, 1000);
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="loginwraper">
                <div className="loginbox">
                    <div className="brandlogo">
                        <Icon type="android"/>仿真实训课程中心
                    </div>
                    <p className="subslogen">仿真课程是大街上看到好看就暗示的金卡是等级考核卡就是的黄金卡上的框架阿斯顿</p>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入您的邮箱地址!'
                                    }, {
                                        type: 'email',
                                        message: '请输入合法的邮箱地址!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder="邮箱"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入您的密码!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    type="password"
                                    placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>保持登录</Checkbox>
                            )}
                            <span onClick={this.forget} className="login-form-forgot forgetpass">忘记密码</span>

                        </FormItem>
                        <Button
                            type="primary"
                            loading={this.state.loading}
                            onClick={this.doLogin}
                            className="login-form-button dologin">
                            {this.state.loading
                                ? '登录中...'
                                : '登录'
}
                        </Button>
                        {/* <span className="register">没有账号？<Link to="/register">立即注册</Link></span> */}
                    </Form>
                </div>
                <Modal
                    title="忘记密码"
                    visible={this.state.forget}
                    onCancel={this.cancelForget}
                    okText="确认"
                    cancelText="取消">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('truename', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入您的姓名!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder="姓名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入您的邮箱!'
                                    }, {
                                        type: 'email',
                                        message: '请输入合法的邮箱地址!'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={< Icon type = "mail" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                    type="text"
                                    placeholder="邮箱"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {current: store}
}
const mapDispatchToProps = (dispatch) => {
    return {
        change: () => {
            // dispatch(change(key))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Login))