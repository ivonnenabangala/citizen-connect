export interface Discussions {
    topicId: number
    opinionId: number
    question: string
    opinion: string
    summarizedOpinion?: string;
    isLoading?: boolean; // Tracks loading state
  errorMessage?: string;
}
