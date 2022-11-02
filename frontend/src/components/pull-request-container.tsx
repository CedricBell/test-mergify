import axios from "axios";
import React from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import PullRequestCard from "./pull-request-card";
import dataFromJson from '../resources/data/mock-mr.json';
import { PullRequest } from "../model/pullRequest";

class PullRequestContainer extends React.Component<{ prdetails: any }, { repositoryURL: string, nextPR: any, urgentPR: Array<PullRequest>, hpPR: Array<PullRequest>, claPR: Array<PullRequest>, bfPR: Array<PullRequest> }> {

    constructor(props: any) {
        super(props);
        this.state = {
            repositoryURL: '',
            nextPR: '',
            urgentPR: new Array<PullRequest>(),
            hpPR: new Array<PullRequest>(),
            claPR: new Array<PullRequest>(),
            bfPR: new Array<PullRequest>()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // function to handle the click on button 
    async handleSubmit(event: any) {
        event.preventDefault();

        var pr_list = dataFromJson;
        this.displayPrList(pr_list);

        // Setting the next Pull Request to review 
        axios.post(`http://localhost:8000/pull-requests/next-to-review`, { pr_list })
            .then(nextPullRequest => {
                this.setState({ nextPR: nextPullRequest.data });
            });
    }

    // function to display the pull requests corresponding to each section 
    displayPrList(pr_list: any) {

        var urgentPR = new Array<PullRequest>();
        var bfPR = new Array<PullRequest>();
        var hpPR = new Array<PullRequest>();
        var claPR = new Array<PullRequest>();

        pr_list.forEach((pr: any) => {
            pr.labels.forEach((label: string) => {
                if (label === "urgent") {
                    urgentPR.push(pr);
                }
                if (label === "bugfix") {
                    bfPR.push(pr);
                }
                if (label === "help-needed") {
                    hpPR.push(pr);
                }
                if (label === "CLA") {
                    claPR.push(pr);
                }
            })
        });
        this.setState({
            urgentPR: urgentPR,
            bfPR: bfPR,
            hpPR: hpPR,
            claPR: claPR
        });
    }

    // function to update the state of the form input when user is typing.
    handleChange(event: any) {
        this.setState({ repositoryURL: event.target.value });
    }

    render() {
        return (

            <div className="pr-container">
                <InputGroup className="mb-3 input-repo-url">
                    <Form.Control type="repoURL" placeholder="Enter repository URL" value={this.state.repositoryURL} onChange={this.handleChange}
                    />
                    <Button name="prBtn" id="prBtn" variant="primary" type="submit" onClick={this.handleSubmit} >
                        Get Pull Requests
                    </Button>
                </InputGroup>

                <div className="pr-to-review">
                    <h2 >
                        Next PR to review :
                    </h2>
                    <Alert key="primary" variant="primary">
                        <PullRequestCard prdetails={this.state.nextPR}></PullRequestCard>
                    </Alert>
                </div>



                <h2>
                    <div className="contenth2">
                        Pull requests by label
                    </div>
                </h2>

                <div className="columns">
                    <div className="column">
                        <h3 className="column-title">  Urgent</h3>
                        {this.state.urgentPR?.map((pr, index) => (
                            <PullRequestCard key={index} prdetails={pr}></PullRequestCard>
                        ))}
                    </div>
                    <div className="column">
                        <h3 className="column-title">  Help needed</h3>
                        {this.state.hpPR?.map((pr, index) => (
                            <PullRequestCard key={index} prdetails={pr}></PullRequestCard>
                        ))}
                    </div>
                    <div className="column">
                        <h3 className="column-title">  Bugfix</h3>
                        {this.state.bfPR?.map((pr, index) => (
                            <PullRequestCard key={index} prdetails={pr}></PullRequestCard>
                        ))}

                    </div>
                    <div className="column">
                        <h3 className="column-title">  CLA signed</h3>
                        {this.state.claPR?.map((pr, index) => (
                            <PullRequestCard key={index} prdetails={pr}></PullRequestCard>
                        ))}
                    </div>
                </div >
            </div >
        );
    }
}

export default PullRequestContainer;
