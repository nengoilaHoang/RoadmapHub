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
  name VARCHAR(100),
  description VARCHAR(255),
  roadmapId VARCHAR(36) NULL,
  FOREIGN KEY (teacherId) REFERENCES Account(id),
  FOREIGN KEY (roadmapId) REFERENCES Roadmap(id)
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
  content VARCHAR(255)
);
-- Comment table
CREATE TABLE Comment(
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(36),
  classroomId VARCHAR(36),
  postId VARCHAR(36),
  FOREIGN KEY (accountId) REFERENCES Account(id),
  FOREIGN KEY (classroomId) REFERENCES Classroom(id),
  FOREIGN KEY (postId) REFERENCES Post(id),
  createDate VARCHAR(16),
  content VARCHAR(255)
);
CREATE TABLE Notification (
  id VARCHAR(36) PRIMARY KEY,
  receiverId VARCHAR(36),       
  senderId VARCHAR(36),         
  content VARCHAR(255) NOT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  createDate VARCHAR(16),
  link VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (senderId) REFERENCES Account(id),
  FOREIGN KEY (receiverId) REFERENCES Account(id)
);


-- ============================================ Mock Data =========================================
-- Account
INSERT INTO account (id, username, email, password, classroomLimit)
VALUES
('661b2db8-e1af-9824-f5c2-721965eaebb6', 'kitdev', 'kitdevhoang@gmail.com', '$2b$10$T9vDA8xKZ5Q9S5C3.1imVuKuL7buyHA1hY8/GYMrHX1V35cXN1ACW', 1),
('30254e37-7f55-11', 'hoang4', 'levanviethoang05@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30254f66-7f55-11', 'hoang3', 'levanviethoang03@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30254fca-7f55-11', 'hoang2', 'levanviethoang02@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30255001-7f55-11', 'hoang1', 'levanviethoang01@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('30255039-7f55-11', 'kien', 'kien@gmail.com', '$10$Yi5hDoADwkRY7KwGbu6CUeZ.3sIsJWdtW05Rqof98sSJlbAz9aaYC', 1),
('a1a24ce2-9f76-32d5-61ea-0389ba090175', 'Kiên Mai', 'imosciencemath@gmail.com', '$2b$10$k8DdCRsv/q8oOo8dRMjSHur0rK0VKtMKGQkqOTf8CIXd4tyBSCs9O', 1);
-- Profile
INSERT INTO profile (id, accountId, fullname, github, linkedin, avatar)
VALUES
('bf96473a-282b-4c', '30254e37-7f55-11', 'Lê Văn Việt Hoàng', 'https://github.com/viethoang04', 'https://linkedin.com/in/viet-hoang-le', 'https://avatar.githubusercontent.com/viethoang04'),
('953e78ac-12a1-4f', '30254f66-7f55-11', 'Nguyễn Minh Hoàng', 'https://github.com/hoang03', 'https://linkedin.com/in/minh-hoang-nguyen', 'https://avatar.githubusercontent.com/hoang03'),
('c6cc161d-e1a2-48', '30254fca-7f55-11', 'Trần Đức Hoàng', 'https://github.com/hoang02', NULL, NULL),
('f339880e-97ce-44', '30255001-7f55-11', 'Phạm Văn Hoàng', NULL, 'https://linkedin.com/in/van-hoang-pham', NULL),
('4cc488d6-0155-4f', '30255039-7f55-11', 'Mai Đức Kiên', 'https://github.com/kienduc', 'https://linkedin.com/in/duc-kien-mai', NULL),
('e9835529-f28b-569e-2a53-9bcf52d3f708', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'Kiên Mai', NULL, NULL, 'https://deadline.com/wp-content/uploads/2024/09/Pokemon-Mini-Series-Aim-to-Be-a-Pokemon-Master-Ep-1-11.jpg?w=800'),
('6fa334e9-2e68-2a1d-c565-cf18ede3e36e', '661b2db8-e1af-9824-f5c2-721965eaebb6', 'kitdev', NULL, NULL, NULL);
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
('d01c5a59-f3cf-44', '30255039-7f55-11', NULL, 'Web Design', 'UI/UX design principles and tools',1,0,0),
('77f71118-f6f5-7aaf-d932-5a56b8d247c0','a1a24ce2-9f76-32d5-61ea-0389ba090175',NULL,'1','1',1,0,0);
-- Classroom
INSERT INTO `classroom` VALUES ('ce0ae0c4-d9db-f729-2706-963fa0395113', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'lh', 'lh','77f71118-f6f5-7aaf-d932-5a56b8d247c0');
-- Post

INSERT INTO `post` VALUES ('1', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '2025-09-09',  '📢📢📢 Điểm tổng kết môn học 📢📢📢\r\n👉 Các em xem điểm trong file đính kèm nhé, điểm cả 3 lớp thầy để chung 1 file.\r\n👉 Điểm cá nhân nằm trong sheet riêng của từng lớp\r\n👉 Điểm đồ án, gồm 2 cột GK CK nằm trong sheet `G-Project-Agg`, và có chuyển sang 2 cột GK CK ');
INSERT INTO `post` VALUES ('2', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '2025-09-09',  'Từ thứ 7 tới giờ có rất nhiều bạn quan tâm việc khi nào nộp đồ án, khi còn học thầy đã thông báo là 1 tuần sau khi thi sẽ nộp đồ án mà các em cứ hỏi mãi.\r\n\r\n- Nhóm nào làm xong rồi thì cứ để đó, khi nào có link nộp thì nộp\r\n- Nhóm nào làm chưa xong thì lo');
INSERT INTO `post` VALUES ('3c7013e3-ce4b-7761-114a-7c54d020ed2e', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '2025-09-26', '<p>ádasdsda</p>');
INSERT INTO `post` VALUES ('d1a3460d-e7e2-c297-cf40-6995df01fc38', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '2025-09-26', '<p>ádasdasdasd</p>');
-- Comment
INSERT INTO `comment` VALUES ('1', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '1', '2025-09-09', 'Làm hết em');
INSERT INTO `comment` VALUES ('2', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '2', '2025-09-09', 'Clip quá trình thì chứa đầy đủ quá trình làm bài là được');
INSERT INTO `comment` VALUES ('3', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '1', '2025-09-09', 'Làm hết em oke thay');
INSERT INTO `comment` VALUES ('4', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '1', '2025-09-08', 'kkkkk');
INSERT INTO `comment` VALUES ('5', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '1', '2025-09-07', 'iiii');
-- studentClassroom
INSERT INTO `studentclassroom` VALUES ('09d65ee2-5313-82b1-7389-3b662f357b0d', 'ce0ae0c4-d9db-f729-2706-963fa0395113', '661b2db8-e1af-9824-f5c2-721965eaebb6');
-- Notification
INSERT INTO `notification` VALUES ('20a1f6cd-2e67-431a-e2a4-495bae748eda', '661b2db8-e1af-9824-f5c2-721965eaebb6', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', '<p>ádasdasdasd</p>', 0, '2025-09-26T10:24',NULL);
INSERT INTO `notification` VALUES ('881c99ed-6240-6eea-7950-43f09f095c9a', '661b2db8-e1af-9824-f5c2-721965eaebb6', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', '<p>ádasdsda</p>', 0, '2025-09-26T09:54',NULL);
INSERT INTO `notification` VALUES ('8ee0a30a-16b9-4eb3-eca6-d4074b78068b', '661b2db8-e1af-9824-f5c2-721965eaebb6', 'a1a24ce2-9f76-32d5-61ea-0389ba090175', '<p>ádasdasdasdasd</p>', 0, '2025-09-26T10:24',NULL);