DROP DATABASE test;
CREATE DATABASE test;
-- Account table
CREATE TABLE Account(
  id BINARY(16) PRIMARY KEY,
  username VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(32) NOT NULL,
  classroomLimit INT DEFAULT(1)
);
-- Profile table
CREATE TABLE Profile(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  fullname VARCHAR(255) NOT NULL,
  github VARCHAR(255),
  linkedin VARCHAR(255),  
  avatar VARCHAR(255)
);
-- Team table
CREATE TABLE Team(
  id BINARY(16) PRIMARY KEY
);
-- TeamMember table
CREATE TABLE TeamMember(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  teamId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (teamId) REFERENCES Team(id),
  role VARCHAR(16)
);
-- Roadmap table
CREATE TABLE Roadmap(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  teamId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (teamId) REFERENCES Team(id),
  name VARCHAR(16),
  description VARCHAR(255)
);
-- Node table
CREATE TABLE Node(
  id BINARY(16) PRIMARY KEY,
  roadmapId BINARY(16),
  parentTopicId BINARY(16),
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
  id BINARY(16) PRIMARY KEY,
  nodeId BINARY(16),
  FOREIGN KEY (nodeId) REFERENCES Node(id),
  content VARCHAR(255)
);
-- Link table
CREATE TABLE Link(
  id BINARY(16) PRIMARY KEY,
  nodeId BINARY(16),
  FOREIGN KEY (nodeId) REFERENCES Node(id),
  content VARCHAR(255),
  link VARCHAR(255)
);
-- Edge table
CREATE TABLE Edge(
  id BINARY(16) PRIMARY KEY,
  roadmapId BINARY(16),
  startNodeId BINARY(16),
  goalNodeId BINARY(16),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  FOREIGN KEY (startNodeId) REFERENCES Node(id),
  FOREIGN KEY (goalNodeId) REFERENCES Node(id),
  type VARCHAR(255)
);
-- Classroom table
CREATE TABLE Classroom(
  id BINARY(16) PRIMARY KEY,
  teacherId BINARY(16),
  FOREIGN KEY (teacherId) REFERENCES Account(id)
);
-- Quiz table
CREATE TABLE Quiz(
  id BINARY(16) PRIMARY KEY,
  topicId BINARY(16),
  classroomId BINARY(16),
  FOREIGN KEY (topicId) REFERENCES Node(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id)
);
-- Question table
CREATE TABLE Question(
  id BINARY(16) PRIMARY KEY,
  quizId BINARY(16),
  FOREIGN KEY (quizId) REFERENCES Quiz(id),
  content VARCHAR(255) -- tăng lên
);
-- answer table
CREATE TABLE Answer(
  id BINARY(16) PRIMARY KEY,
  questionId BINARY(16),
  FOREIGN KEY (questionId) REFERENCES Question(id),
  answer VARCHAR(255), -- tăng lên
  isCorrect TINYINT(1)
);
-- StudentClassroom table
CREATE TABLE StudentClassroom(
  id BINARY(16) PRIMARY KEY,
  classroomId BINARY(16),
  studentId BINARY(16),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  FOREIGN KEY (studentId) REFERENCES Account(id)
);
-- DoQuiz table
CREATE TABLE DoQuiz(
  id BINARY(16) PRIMARY KEY,
  quizId BINARY(16),
  accountId BINARY(16),
  classroomId BINARY(16),
  FOREIGN KEY (quizId) REFERENCES Quiz(id),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  score INT
);
-- MarkRoadmap table
CREATE TABLE MarkRoadmap(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  roadmapId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id)
);
-- LearnRoadmap table (xem xét chuyển qua view)
CREATE TABLE LearnRoadmap(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  roadmapId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  inProgressTopics INT,
  doneTopics INT
);
-- LearnTopic table
CREATE TABLE LearnTopic(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  topicId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (topicId) REFERENCES Node(id),
  topicProgress VARCHAR(16)
);
-- RoadmapFeedback table
CREATE TABLE RoadmapFeedback(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  roadmapId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id),
  type VARCHAR(16),
  content VARCHAR(255)
);
-- Post table
CREATE TABLE Post(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  classroomId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  createDate VARCHAR(16),
  title VARCHAR(255),
  content VARCHAR(255)
);
-- Comment table
CREATE TABLE Comment(
  id BINARY(16) PRIMARY KEY,
  accountId BINARY(16),
  classroomId BINARY(16),
  postId BINARY(16),
  repCommentId BINARY(16),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  FOREIGN KEY (postId) REFERENCES Post(id),
  FOREIGN KEY (repCommentId) REFERENCES Comment(id),
  createDate VARCHAR(16),
  content VARCHAR(255)
);
