
import datetime
import re
from ..app import computeScore


def test_dummy() -> None:
    assert True


def test_compute_pr_score():
    '''
    testing the correctness of a given pull request example
    '''
    pr = {
        "id": 5,
        "title": "this is a title of pull request",
        "status": "draft",
        "created_by": "antoine",
        "created_at": "2022-04-23T18:25:43.511Z",
        "lines_changed": 20,
        "labels": [
            "urgent",
            "help-needed"
        ]
    }
    res = computeScore(pr)
    if re.search("^[a-e]", pr['created_by']) is not None:
        if datetime.datetime.today().weekday() == "Monday":
            assert res == 5
        else:
            assert res == 4
