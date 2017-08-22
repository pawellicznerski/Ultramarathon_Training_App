import React, { Component }  from 'react';
import ReactPDF from 'react-pdf';

export class TrainingPlanPDF extends Component {
  constructor(props) {
  super(props);
  this.state = {

    };
  } //props end

    onDocumentLoad({ total }) {
        this.setState({ total });
    }

    onPageLoad({ pageIndex, pageNumber }) {
        this.setState({pageIndex, pageNumber });
    }

    render() {
        return (
            <div>
                <ReactPDF
                    file="somefile.pdf"
                    pageIndex={2}
                    onDocumentLoad={this.onDocumentLoad}
                    onPageLoad={this.onPageLoad}
                />
                <p>Page {this.state.pageNumber} of {this.state.total}</p>
            </div>
        );
    }
}
