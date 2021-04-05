import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

// const toolbarOptions = [];

class Richtexteditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
  }

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"], // toggled buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "super",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];

  // handleChange(value) {
  //   this.setState({ text: value });
  // }

  render() {
    const { values, handleValueChange } = this.props;

    return (
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        style={{ width: "100%" }}
        // value={values.product_description}
        onChange={handleValueChange("product_description")}
      />
    );
  }
}

export default Richtexteditor;
