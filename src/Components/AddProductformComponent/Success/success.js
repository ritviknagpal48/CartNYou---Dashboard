import React, { Component } from 'react';

import { Row, Col, Select, Alert, Progress } from 'antd';
import './success.css'

const { Option } = Select;

export class success extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextstep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevstep();
    }
    render() {
        return (
            <div className="form container">
                <Row>
                    <Alert
                        message="Success"
                        description="Your product has been added successfully."
                        type="success"
                        showIcon
                    />
                </Row>
            </div>
        )
    }
}

export default success;