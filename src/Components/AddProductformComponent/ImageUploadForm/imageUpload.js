import React, { Component } from 'react';

import { Row, Col, Form, Button, Select, Upload, label, Progress } from 'antd';
import { UploadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import './imageUpload.css'

import { Steps } from 'antd';

const { Step } = Steps;


const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class ImageUpload extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextstep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevstep();
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },

        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    render() {

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <UploadOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { values, handlechange } = this.props;
        const { Aadharcard, PANcard, Bankpassbook, Incomecerti,
            Cropregistercerti, Landcerti, Photo, Signature } = this.props;
        return (
            <div className="container">
                <Form onSubmit={this.continue} className="form container">
                    <Row style={{ marginBottom: "30px" }}>
                        <Steps size="small" current={2} responsive={true}>
                            <Step title="General Details" />
                            <Step title="Variants Details" />
                            <Step title="Product Images" />
                            <Step title="Shipping Details" />
                            <Step title="Other Details" />
                        </Steps>

                    </Row>

                    <div className="clearfix">
                        <Form.Item label="Product Images">
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                    </div>
                    <Row className="inline" style={{ justifyContent: "flex-end" }}>
                        <Button className="back" style={{ marginRight: "10px" }}
                            onClick={this.back}>
                            <LeftOutlined />
                        Back
                    </Button>
                        <Button className="continue"
                            onClick={this.continue}>
                            Next
                            <RightOutlined />
                        </Button>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default ImageUpload;