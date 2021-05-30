import { Form, message, Modal, Upload } from "antd";
import AWS from "aws-sdk";
import cryptoRandomString from "crypto-random-string";
import { capitalize } from "lodash";
import { extname } from "path";
import React, { Component } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./AddProductformComponent/ImageUploadForm/imageUpload.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// var fileList = [];

const props = {
  // multiple: false,
  onStart(file) {
    // console.log("onStart", file, file.name);
  },
  onError(err) {
    // console.log("onError", err);
  },
  onProgress({ percent }, file) {
    // console.log("onProgress", `${percent}%`, file.name);
  },
  customRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) {
    AWS.config.update({
      accessKeyId: "AKIASGWV7K4INWFV66KP",
      secretAccessKey: "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",
      sessionToken: "",
    });

    const S3 = new AWS.S3();

    file
      .arrayBuffer()
      .then((buffer) => {
        const objParams = {
          Bucket: "cartnyouawsbuket",
          Key:
            cryptoRandomString({ length: 16, type: "alphanumeric" }) +
            extname(file.name),
          Body: buffer,
          ACL: "public-read",
          ContentType: file.type,
        };

        return S3.putObject(objParams).promise();
      })
      .then((res) => {
        const url =
          res.$response.request.httpRequest.endpoint.hostname +
          res.$response.request.httpRequest.path;

        return onSuccess(`https://${url}`, file);
      })
      .catch(onError);
  },
};

class UploadSingleImage extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextstep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevstep();
  };

  state = {
    previewVisible: false,
    previewImage: "",
    fileList:
      this.props && this.props.values && this.props.values.images
        ? this.props.values.images
        : [],
    loading: false,
  };

  handleCancel = () => this.setState({ previewVisible: false, loading: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    // console.log({ handleChange: fileList });
    const newFileList = fileList.filter((x) => x.status === "done");
    this.setState(
      { fileList: newFileList, loading: !!newFileList.length },
      () => {
        this.props.handleUploadSingleImage(newFileList);
      }
    );
  };

  render() {
    const { previewVisible, previewImage, loading } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    // console.log(this.state);
    // console.log(props);
    return (
      <Form.Item
        label={`${this.props.title.split("_").map(capitalize).join(" ")}`}
        //   className={"single-image-upload"}
      >
        <Upload
          disabled={this.props.disabled}
          action="https://cartnyouawsbuket.s3.ap-south-1.amazonaws.com/"
          listType="picture-card"
          fileList={this.state.fileList}
          {...props}
          beforeUpload={(file) => {
            const allowed_types = ["image/png", "image/jpg", "image/jpeg"];
            if (!allowed_types.includes(file.type))
              return message.error("Select a valid Image type.");
          }}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onSuccess={(url, file) => {
            const obj = {
              url,
              uid: file.uid,
              status: "done",
              name: file.name,
            };

            const newFileList = [obj].filter((x) => x.status === "done");

            this.setState(
              {
                fileList: newFileList,
                loading: false,
              },
              () => {
                this.props.handleUploadSingleImage(newFileList);
                // console.log({ fileList: this.state.fileList });
              }
            );
          }}
        >
          {this.state.fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    );
  }
}

export default UploadSingleImage;
