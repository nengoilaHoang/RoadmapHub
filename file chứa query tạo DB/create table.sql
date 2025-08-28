DROP DATABASE test;
CREATE DATABASE test;
-- Account table
CREATE TABLE Account(
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  classroomLimit INT DEFAULT(1)
);
-- Profile table
CREATE TABLE Profile(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  fullname VARCHAR(255) NOT NULL,
  github VARCHAR(255),
  linkedin VARCHAR(255),  
  avatar VARCHAR(255)
);
-- Team table
CREATE TABLE Team(
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255)
);
-- TeamMember table
CREATE TABLE TeamMember(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  teamId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (teamId) REFERENCES Team(id),
  role VARCHAR(16)
);
-- Roadmap table
CREATE TABLE Roadmap(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  teamId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (teamId) REFERENCES Team(id),
  name VARCHAR(16),
  description VARCHAR(255),
  isPublic TINYINT(1),
  learning INT DEFAULT(0),
  teaching INT DEFAULT(0)
  
);
-- Node table
CREATE TABLE Node(
  id VARCHAR(36) PRIMARY KEY,
  roadmapId VARCHAR(36),
  parentTopicId VARCHAR(36),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  FOREIGN KEY (parentTopicId) REFERENCES Node(id),
  type VARCHAR(255),
  xCoordinates INT,
  yCoordinates INT,
  height INT,
  width INT,
  layering INT,
  fontSize INT,
  haveEdge TINYINT(1),
  text VARCHAR(255),
  description VARCHAR(255),
  textColor VARCHAR(16),
  url VARCHAR(255),
  backgroundColor VARCHAR(255),
  boderColor VARCHAR(255),
  boderRadius INT
);
-- TodoThing table
CREATE TABLE TodoThing(
  id VARCHAR(36) PRIMARY KEY,
  nodeId VARCHAR(36),
  FOREIGN KEY (nodeId) REFERENCES Node(id),
  content VARCHAR(255)
);
-- Link table
CREATE TABLE Link(
  id VARCHAR(36) PRIMARY KEY,
  nodeId VARCHAR(36),
  FOREIGN KEY (nodeId) REFERENCES Node(id),
  content VARCHAR(255),
  link VARCHAR(255)
);
-- Edge table
CREATE TABLE Edge(
  id VARCHAR(36) PRIMARY KEY,
  roadmapId VARCHAR(36),
  startNodeId VARCHAR(36),
  goalNodeId VARCHAR(36),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  FOREIGN KEY (startNodeId) REFERENCES Node(id),
  FOREIGN KEY (goalNodeId) REFERENCES Node(id),
  type VARCHAR(255)
);
-- Classroom table
CREATE TABLE Classroom(
  id VARCHAR(36) PRIMARY KEY,
  teacherId VARCHAR(36),
  FOREIGN KEY (teacherId) REFERENCES Account(id)
);
-- Quiz table
CREATE TABLE Quiz(
  id VARCHAR(36) PRIMARY KEY,
  topicId VARCHAR(36),
  classroomId VARCHAR(36),
  FOREIGN KEY (topicId) REFERENCES Node(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id)
);
-- Question table
CREATE TABLE Question(
  id VARCHAR(36) PRIMARY KEY,
  quizId VARCHAR(36),
  FOREIGN KEY (quizId) REFERENCES Quiz(id),
  content VARCHAR(255) -- tăng lên
);
-- answer table
CREATE TABLE Answer(
  id VARCHAR(36) PRIMARY KEY,
  questionId VARCHAR(36),
  FOREIGN KEY (questionId) REFERENCES Question(id),
  answer VARCHAR(255), -- tăng lên
  isCorrect TINYINT(1)
);
-- StudentClassroom table
CREATE TABLE StudentClassroom(
  id VARCHAR(36) PRIMARY KEY,
  classroomId VARCHAR(36),
  studentId VARCHAR(36),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  FOREIGN KEY (studentId) REFERENCES Account(id)
);
-- DoQuiz table
CREATE TABLE DoQuiz(
  id VARCHAR(36) PRIMARY KEY,
  quizId VARCHAR(36),
  accountId VARCHAR(36),
  classroomId VARCHAR(36),
  FOREIGN KEY (quizId) REFERENCES Quiz(id),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  score INT
);
-- MarkRoadmap table
CREATE TABLE MarkRoadmap(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  roadmapId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id)
);
-- LearnRoadmap table (xem xét chuyển qua view)
CREATE TABLE LearnRoadmap(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  roadmapId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  inProgressTopics INT,
  doneTopics INT
);
-- LearnTopic table
CREATE TABLE LearnTopic(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  topicId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (topicId) REFERENCES Node(id),
  topicProgress VARCHAR(16)
);
-- RoadmapFeedback table
CREATE TABLE RoadmapFeedback(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  roadmapId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  type VARCHAR(16),
  content VARCHAR(255)
);
-- Post table
CREATE TABLE Post(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  classroomId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  createDate VARCHAR(16),
  title VARCHAR(255),
  content VARCHAR(255)
);
-- Comment table
CREATE TABLE Comment(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  classroomId VARCHAR(36),
  postId VARCHAR(36),
  repCommentId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  FOREIGN KEY (postId) REFERENCES Post(id),
  FOREIGN KEY (repCommentId) REFERENCES Comment(id),
  createDate VARCHAR(16),
  content VARCHAR(255)
);