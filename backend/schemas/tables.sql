CREATE TABLE Users (
    id PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' NOT NULL
);

CREATE TABLE Polls (
    pollId INT IDENTITY(1,1) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    yes_votes INT DEFAULT 0,
    no_votes INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    expires_at DATETIME NULL,
    status VARCHAR(10) DEFAULT 'active' -- Can be 'active' or 'closed'
);

CREATE TABLE Votes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId UNIQUEIDENTIFIER NOT NULL,
    pollId INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Votes_User FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_Votes_Poll FOREIGN KEY (pollId) REFERENCES Polls(pollId) ON DELETE CASCADE,
    CONSTRAINT UQ_User_Poll UNIQUE (userId, pollId) -- Prevents duplicate votes
);

CREATE TABLE TopicQuestion(
    topicId INT IDENTITY(1,1) PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
)

CREATE TABLE Opinions(
    opinionId INT IDENTITY(1, 1) PRIMARY KEY,
    topicId INT NOT NULL,
    opinion VARCHAR(1600) NOT NULL,

    CONSTRAINT FK_View_Feedback FOREIGN KEY (topicId) REFERENCES TopicQuestion(topicId) ON DELETE CASCADE,
)

CREATE TABLE Documents (
    documentId INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(255),
    description VARCHAR(1000),
    fileUrl VARCHAR(500), 
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Incidents (
    incidentId INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(1000),
    location VARCHAR(100),
    imageUrl VARCHAR(500),
    created_at DATETIME DEFAULT GETDATE()

    CONSTRAINT FK_Incident_UserId FOREIGN KEY (userId) REFERENCES Users(id),
);

