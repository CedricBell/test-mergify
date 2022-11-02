
from marshmallow import Schema, fields
from marshmallow.validate import Length, Range, OneOf


class PullRequestSchema(Schema):
    '''
    The data structure to represent a Pull Request 
    '''
    id = fields.Number(required=True, validate=Range(min=1))
    title = fields.Str(required=True, validate=Length(max=100))
    status = fields.Str(required=True, validate=OneOf(
        ["draft", "review", "mergeable"]))
    created_by = fields.Str(required=True, validate=Length(max=20))
    created_at = fields.DateTime(required=True)
    lines_changed = fields.Number(required=True)
    labels = fields.List(fields.Str(required=True))
