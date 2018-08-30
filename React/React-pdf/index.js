import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

export default class RreviewPdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    file: null
  }
 
  componentDidMount() {
    if(this.props.location.state && this.props.location.state.invoicePdfUrl){
        this.setState({
            file: this.props.location.state.invoicePdfUrl
        })
    }
  }
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    if(!this.state.file) {
        return null;
    }
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <Document
          file="//m.dev.lijiabaobei.com/buckets/invoice/B7B/CDB/119110/LJFP119110.pdf?v=9c3634a51f3a26e8095abe0a3ea7245c"
          onLoadSuccess={this.onDocumentLoad}
          options={{
            cMapUrl: 'cmaps/',
            cMapPacked: true
          }}
        >
        <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}