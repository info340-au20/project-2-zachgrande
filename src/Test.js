import React, { Component } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";

class Test extends Component {
    
    state = {
    collapseID: ""
    }

    toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
    }

    render() {
        return (
            <div class="expand-button float-right" >
                <MDBBtn color="secondary" onClick={this.toggleCollapse("basicCollapse")} style={{ marginBottom: "1rem" }}>
                    Expand
                </MDBBtn>
                <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                <p>
                    Insert "Cover Title" and "Details"
                </p>
                </MDBCollapse>
            </div>
        );
    }
}

export default Test;
