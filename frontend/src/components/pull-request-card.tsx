import React from "react";
import { Badge, Card } from "react-bootstrap";
import { BiGitMerge } from 'react-icons/bi';


class PullRequestCard extends React.Component<{ prdetails: any }, {}> {

  // function to compute the number of days between today and the day the pull request was created at.
  displayPrDate(datePr: Date): number {
    if (datePr === undefined) {
      return 0;
    }
    const now = new Date();
    const tmp = new Date(datePr);

    const daysBetweenDates = Math.round((now.getTime() - tmp.getTime()) / (1000 * 3600 * 24));

    return daysBetweenDates;
  }

  render() {

    return (
      <div className="pr-card">
        <Card border="secondary" style={{ width: '100%' }}>
          <Card.Header> <BiGitMerge />    {this.props.prdetails.title}</Card.Header>
          <Card.Body>
            <Card.Title>
              <div className="badge-container">
                {this.props.prdetails.labels?.map((label: string, index: number) => (
                  <div key={index} className="badge"><Badge>{label}</Badge> </div>
                ))}
              </div>
            </Card.Title>
            <Card.Text>
              #{this.props.prdetails.id} opened {this.displayPrDate(this.props.prdetails.created_at)} days ago by {this.props.prdetails.created_by}
            </Card.Text>
          </Card.Body>
        </Card>
      </div >
    );
  }
}

export default PullRequestCard;
