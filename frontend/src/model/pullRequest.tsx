
// Model class for pull request data structure
export class PullRequest {
    id: number;
    title: string;
    status: string;
    created_by: string;
    created_at: Date;
    lines_changed: number;
    labels: [string];

    constructor() {
        this.id = 0;
        this.title = "title";
        this.status = "status";
        this.created_at = new Date();
        this.created_by = "created_by";
        this.lines_changed = 0;
        this.labels = ['label'];
    }
}
