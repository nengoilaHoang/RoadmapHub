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
-- Friend table
CREATE TABLE Friend(
  id VARCHAR(36) PRIMARY KEY,
  senderId VARCHAR(36),
  receiverId VARCHAR(36),
  requestState VARCHAR(36), -- Pending/Accepted/Rejected/Canceled
  createAt DATETIME
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
  isPublic TINYINT(1) DEFAULT(0),
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

-- ============================================ Mock Data =========================================
-- Account
INSERT INTO account (id, username, email, password, classroomLimit)
VALUES
('30254e37-7f55-11', 'hoang4', 'levanviethoang05@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30254f66-7f55-11', 'hoang3', 'levanviethoang03@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30254fca-7f55-11', 'hoang2', 'levanviethoang02@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30255001-7f55-11', 'hoang1', 'levanviethoang01@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30255039-7f55-11', 'kien', 'kien@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1);
-- Profile
INSERT INTO profile (id, accountId, fullname, github, linkedin, avatar)
VALUES
('bf96473a-282b-4c', '30254e37-7f55-11', 'Lê Văn Việt Hoàng', 'https://github.com/viethoang04', 'https://linkedin.com/in/viet-hoang-le', 'https://avatar.githubusercontent.com/viethoang04'),
('953e78ac-12a1-4f', '30254f66-7f55-11', 'Nguyễn Minh Hoàng', 'https://github.com/hoang03', 'https://linkedin.com/in/minh-hoang-nguyen', 'https://avatar.githubusercontent.com/hoang03'),
('c6cc161d-e1a2-48', '30254fca-7f55-11', 'Trần Đức Hoàng', 'https://github.com/hoang02', NULL, NULL),
('f339880e-97ce-44', '30255001-7f55-11', 'Phạm Văn Hoàng', NULL, 'https://linkedin.com/in/van-hoang-pham', NULL),
('4cc488d6-0155-4f', '30255039-7f55-11', 'Mai Đức Kiên', 'https://github.com/kienduc', 'https://linkedin.com/in/duc-kien-mai', NULL);
-- Team
INSERT INTO team (id, name)
VALUES
('cdd9bc7d-74df-4d', 'Team 1'),
('4544733b-2edc-43', 'team 2');
-- Team member
INSERT INTO teamMember (id, accountId, teamId, role)
VALUES
('dd6d0476-aba8-4a', '30254e37-7f55-11', 'cdd9bc7d-74df-4d', 'leader'),
('3cf3675a-bc33-4c', '30254f66-7f55-11', 'cdd9bc7d-74df-4d', 'edit'),
('7b2384e4-9e88-45', '30254fca-7f55-11', '4544733b-2edc-43', 'leader'),
('85880c2c-323a-41', '30255001-7f55-11', '4544733b-2edc-43', 'edit'),
('899f38df-dffb-44', '30255039-7f55-11', '4544733b-2edc-43', 'view');
-- Roadmap
INSERT INTO roadmap (id, accountId, teamId, name, description, isPublic, learning, teaching)
VALUES
('03d8a612-d153-49', NULL, 'cdd9bc7d-74df-4d', 'React Guide', 'Complete React learning path for beginners and advanced',1,0,0),
('6805ff98-774f-48', NULL, '4544733b-2edc-43', 'Node.js Path', 'Backend development roadmap with Node.js and Express',1,0,0),
('a431dedf-5d9a-40', '30254e37-7f55-11', NULL, 'Frontend Dev', 'Frontend development roadmap with HTML, CSS, JS',1,0,0),
('228acf8e-8de6-4c', '30254e37-7f55-11', NULL, 'Python Learn', 'Learn Python programming from scratch',1,0,0),
('161ba0fe-aa5e-4c', '30254f66-7f55-11', NULL, 'Java Spring', 'Spring Framework for enterprise applications',1,0,0),
('1d2cde57-fd78-4f', '30254fca-7f55-11', NULL, 'Vue.js Guide', 'Progressive framework for building user interfaces',1,0,0),
('9b59c7cc-028e-46', '30254fca-7f55-11', NULL, 'DevOps Path', 'DevOps practices and tools mastery',1,0,0),
('63945fb4-09a3-44', '30255001-7f55-11', NULL, 'Data Science', 'Data science and machine learning roadmap',1,0,0),
('7fa96882-fbdd-47', '30255001-7f55-11', NULL, 'Mobile Dev', 'Mobile app development guide',1,0,0),
('d01c5a59-f3cf-44', '30255039-7f55-11', NULL, 'Web Design', 'UI/UX design principles and tools',1,0,0);
