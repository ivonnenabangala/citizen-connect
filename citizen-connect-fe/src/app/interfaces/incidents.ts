export interface Incidents {
    incidentId: number,
    userId: string,
    title: string,
    description: string,
    location: string,
    imageUrls: string[],
    // imageUrls: "[\"https://citizenconnect360.s3.eu-north-1.amazonaws.com/images/1740690396780-powerlines1.jpeg\",\"https://citizenconnect360.s3.eu-north-1.amazonaws.com/images/1740690397107-powerlines2.jpeg\"]",
    created_at: string,
    timeAgo?: string
}
