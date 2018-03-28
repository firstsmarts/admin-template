import React, {Component} from 'react'
import NProgress from 'nprogress'
import ReactQuill from 'react-quill'
import {Button} from 'antd'
import 'react-quill/dist/quill.snow.css'
import './index.css'
export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            img: []
        }
        this.handleChange = this
            .handleChange
            .bind(this)
        this.getDom = this
            .getDom
            .bind(this)
        this.choseImage = this
            .choseImage
            .bind(this)
        this.addImage = this
            .addImage
            .bind(this)
        this.downloadFile = (fileName, content) => {
            var aLink = document.createElement('a');
            var blob = new Blob([content]);
            var evt = document.createEvent("Event");
            evt.initEvent("click", true, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.click()
        }
    }
    handleChange(value) {
        this.setState({text: value})
    }
    handleSubmit() {
        if (!this.state.text) {
            return
        }
        this.downloadFile('lesson.html', this.state.text)
    }
    choseImage() {
        this
            .refs
            .insertimg
            .click()
    }
    addImage(myfile) {
        let fileDom = this.refs.insertimg
        let file = fileDom.files[0] || myfile
        let quill = this
            .refs
            .myquill
            .getEditor() // 获取编辑器实例

        let data = new FormData()
        data.append('file', file)
        fetch('/api/v1/file/', {
            method: 'post',
            body: data
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json()
            }
        }).then((res) => {
            if (res.status == 0) {
                let pos = quill.getSelection(true).index
                quill.insertEmbed(pos, 'image', res.data.filepath)
                quill.blur()
                setTimeout(() => {
                    quill.setSelection({index:pos + 1,length:0})
                }, 1000);
            }

        }).catch((err) => {
            console.log(err)
        })

        // let fr = new FileReader() // 此处本应是上传服务器操作，我们没有相关的后台操作，在此省略 fr.onloadend = (e)
        // => {     quill.insertEmbed(quill.getSelection(true).index, 'image',
        // e.target.result) // 将图片插入编辑器
        // quill.setSelection(quill.getSelection(true).index + 1) // 置空 input:file
        // 以防选择同样的图片不做响应 }; fr.readAsDataURL(file);
        fileDom.value = ''

    }
    getDom() {
        return this
    }
    componentDidMount() {
        document.body.onpaste = (e) => {
            let quill = this
            .refs
            .myquill
            .getEditor()
            var file = e.clipboardData.items[0]
            console.log(quill.getSelection(!quill.hasFocus()))
            if (file.kind == 'file' && quill.getSelection()) {
                this.addImage(file.getAsFile())
            }
            
            //这里一直无法获取到，dataTransfer里的files总是空的。
        }
    }
    render() {
        NProgress.done()
        return (
            <div className="maincontent">
                <div id="toolbar">
                    <select className="ql-header" defaultValue="false">
                        <option value="1">
                            标题1
                        </option>
                        <option value="2">
                            标题2
                        </option>
                        <option value="3">
                            标题3
                        </option>
                        <option value="4">
                            标题4
                        </option>
                        <option value="5">
                            标题5
                        </option>
                        <option value="false">
                            默认
                        </option>
                    </select>
                    <span className="ql-formats">
                        <button className="ql-bold"></button>
                        <button className="ql-underline"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-strike"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-insertimg">
                            <svg viewBox="0 0 18 18">
                                <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                                <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
                                <polyline
                                    className="ql-even ql-fill"
                                    points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                            </svg>
                        </button>
                        <button className="ql-link"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-blockquote"></button>
                        <button className="ql-code-block"></button>
                    </span>
                    <span className="ql-formats">
                        <select className="ql-color" defaultValue="ordered"></select >
                        <select className="ql-background"></select>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-script" value="sub"></button>
                        <button className="ql-script" value="super"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                        <button className="ql-indent" value="-1"></button>
                        <button className="ql-indent" value="+1"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-direction" value="rtl"></button>
                        <select className="ql-align"></select>
                    </span>

                </div>
                <input
                    type="file"
                    accept="image/png,image/gif,image/jpg,image/amp"
                    onChange={this.addImage}
                    ref="insertimg"
                    className="insertimg"/>
                <ReactQuill
                    ref="myquill"
                    value={this.state.text}
                    onChange={this.handleChange}
                    modules={{
                    toolbar: {
                        'container': "#toolbar",
                        handlers: {
                            'insertimg': this.choseImage
                        }
                    }
                }}/>

                <Button
                    type="primary"
                    className="submithtml"
                    onClick={this
                    .handleSubmit
                    .bind(this)}>
                    提交
                </Button>

            </div>
        );
    }
}