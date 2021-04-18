import { Component } from 'react'

export class AddToImportListModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productName: this.props && this.props.productName ? this.props.productName : '',
      productID: this.props && this.props.productID ? this.props.productID : "",
    }
  }

  render() {
    return (
      <div className={'text-gray-700 h-24 font-normal leading-3'}>
        Add <span className={'font-bold'}>{this.state.productName}</span> to your import list?
      </div>
    )
  }
}

export default AddToImportListModal
