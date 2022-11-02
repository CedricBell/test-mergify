import datetime
import typing
import re

import flask

from flask_cors import CORS

from mergic.types.types import PullRequestSchema

app = flask.Flask(__name__)
CORS(app)


@app.route("/pull-requests/next-to-review", methods=["POST"])
def next_pr_to_review() -> typing.Any:
    if flask.request.json is None:
        flask.abort(400)

    pr_list = flask.request.json["pr_list"]

    errors = PullRequestSchema(many=True).validate(pr_list)

    if(errors):
        print(errors)
        flask.abort(400)

    return flask.jsonify(get_best_score_pr(pr_list))


def get_best_score_pr(pr_list):
    '''
    Function to get the pull request with the best score from a list of pull requests

    Parameters:
     - pr_list (List(pullRequestSchema))
    '''
    pr_best_score = None
    best_score = 0
    for i in range(1, len(pr_list)):
        current_score = computeScore(pr_list[i])
        if(best_score < current_score):
            pr_best_score = pr_list[i]
            best_score = current_score
    return pr_best_score


def computeScore(pr):
    '''
    Calculating the score of a given pull request 

    Parameters:
     - pr (pullRequestSchema)
    '''
    score = 0
    for label in pr["labels"]:
        if label == "urgent":
            score += 10
            break
    if re.search("^[a-e]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Monday":
            score += 1
    if re.search("^[f-j]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Tueday":
            score += 1
    if re.search("^[k-o]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Wednesday":
            score += 1
    if re.search("^[p-t]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Thursday":
            score += 1
    if re.search("^[u-z]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Friday":
            score += 1
    if not pr['status'] == "mergeable":
        score -= 2
    if int(pr['lines_changed']) < 100:
        score += 1
    if pr['status'] == "draft":
        score -= 5

    return score


@app.route("/")
def helloWorld():
    return "Hello, cross-origin-world!"


application = app
