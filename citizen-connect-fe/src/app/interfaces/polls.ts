export interface Polls {
    pollId: number,
    question: string,
    yes_votes: number,
    no_votes: number,
    created_at: Date,
    expires_at: Date,
    status: string
    totalVotes: number
}
