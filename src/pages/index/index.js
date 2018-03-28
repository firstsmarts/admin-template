import React, {Component} from 'react'
import PubHeader from '../../components/header'
import Left from '../../components/left'
import Result from '../../components/result'
import NProgress from 'nprogress'
import {
    Row,
    Col,
    Card,
    Button,
    Icon,
    Input,
    Table,
    Divider,
    Modal,
    Form
} from '@antd'

import './index.css'

class Add extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}

class FormList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "ck",
            phone: "",
            password: "",
            repassword: "",
            visible: false,
            confirmLoading: false,
            modelType: 1,
            changeShow: false
        }

        // 删除学员
        this.delOk = () => {
            console.log('ok')
            this.setState({confirmLoading: true})
            setTimeout(() => {
                this.setState({confirmLoading: false, visible: false})
            }, 3000);
        }
        this.delCancel = () => {
            this.setState({visible: false})
        }
        this.handleDel = (record) => {
            this.setState({name: record.name, visible: true})
        }

        // 添加学员&修改学员信息
        this.doAdd = (record) => {
            console.log(record.key)
            record.key
                ? this.setState({changeShow: true, modelType: 2, })
                : this.setState({changeShow: true, modelType: 1, name: '', phone: ''})
            
            record.key ? this.props.form.setFieldsValue({
                name: record.name, phone: record.phone, email: record.email
            }) :
            this.props.form.setFieldsValue({
                name: '', phone: '', email: ''
            })


        }
        this.addOk = () => {
            let data = new FormData(document.getElementById('form'))
            console.log(data.get('name'), data.get('phone'))
            this.setState({changeShow: true})
        }
        this.addCancle = () => {
            this.setState({changeShow: false})
        }

        // 提交表单
        this.handleSubmit = (e) => {
            e.preventDefault()
            console.log(1)
        }

        // 表单处理
        this.handleChange = (type, e) => {
            let obj = {}
            obj[type] = e.target.value
            this.setState(obj)
        }

    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [
            {
                title: '学员姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>
            }, {
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone'
            }, {
                title: '电子邮箱',
                dataIndex: 'email',
                key: 'email'
            }, {
                title: '开始学习时间',
                dataIndex: 'start',
                key: 'start'
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <span
                            className="func"
                            onClick={this
                            .doAdd
                            .bind(this, record)}>修改</span>
                        <Divider type="vertical"/>
                        <span
                            className="func"
                            onClick={this
                            .handleDel
                            .bind(this, record)}>删除</span>
                    </div>
                )
            }
        ];
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 4
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 20
                }
            }
        };

        const data = [
            {
                key: '1',
                name: 'John Brown',
                phone: 15111111111,
                start: '2017-12-25 14:45',
                email: 'chengkun@antiy.cn'
            }, {
                key: '2',
                name: 'Jim Green',
                phone: 15111111111,
                start: '2017-12-25 14:45',
                email: 'chengkun@antiy.cn'
            }, {
                key: '3',
                name: 'Joe Black',
                phone: 15111111111,
                start: '2017-12-25 14:45',
                email: 'chengkun@antiy.cn'
            }
        ];
        return (
            <Card className="stulist tablebody" title="学员列表" bordered={false}>
                <div className="searchbox">
                    <Input.Search className="search-input" placeholder="请输入学员姓名" enterButton="搜索"/>
                    <Button
                        className="dosearch"
                        onClick={this
                        .doAdd
                        .bind(this)}
                        type="primary">新增</Button>
                </div>
                {/* <Table columns={columns} dataSource={data}/> */}
                <Modal
                    title="确认删除"
                    visible={this.state.visible}
                    onOk={this.delOk}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.delCancel}>
                    <p>{`确认要删除${this.state.name}`}</p>
                </Modal>

                {/* change&add */}
                <Modal
                    title={this.state.modelType == 1
                    ? '新增学员'
                    : '修改学员信息'}
                    visible={this.state.changeShow}
                    onOk={this
                    .addOk
                    .bind(this)}
                    onCancel={this
                    .addCancle
                    .bind(this)}
                    okText="确认"
                    cancelText="取消">
                    <Form
                        onSubmit={this
                        .handleSubmit
                        .bind(this)}
                        ref="form"
                        id="form">
                        <Form.Item {...formItemLayout} label="学员姓名">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入学员姓名!'
                                    }
                                ]
                                
                            })(<Input
                                name="name"
                                onChange={this
                                .handleChange
                                .bind(this, 'name')}
                                type="text"/>)}

                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入学员联系方式！'
                                    }
                                ]
                            })(<Input
                                name="phone"
                                onChange={this
                                .handleChange
                                .bind(this, 'phone')}
                                type="text"/>)
}

                        </Form.Item>
                        <Form.Item {...formItemLayout} label="电子邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '请输入合法的邮箱地址!'
                                    }, {
                                        required: true,
                                        message: '请输入学员邮箱地址！'
                                    }
                                ]
                            })(<Input
                                name="email"
                                onChange={this
                                .handleChange
                                .bind(this, 'email')}
                                type="text"/>)
}
                            
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}

const Stulist = Form.create()(FormList)

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 1
        }
        this.changeTabe = (i) => {
            console.log(i)
            this.setState({type: i})
        }
    }
    render() {
        return (
            <div className="content">

                <Left
                    type={this.state.type}
                    changeTabe={this
                    .changeTabe
                    .bind(this)}/>
                <div className="main">
                    <PubHeader/> {this.state.type == 1
                        ? <Stulist/>
                        : <Result search title="移动应用权限检测测试题成绩管理"/>
}
                </div>
            </div>
        )
    }
}