import React, { use, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "#utils/api";
import TopicRoadmapClassroom from "#components/Classroom/RoadmapClassroom/TopicRoadmapClassroom/TopicRoadmapClassroom.jsx";
import QuizRoadmapClassroom from "#components/Classroom/RoadmapClassroom/QuizRoadmapClassroom/QuizRoadmapClassroom.jsx";
export default function RoadmapStudentClassroom(props) {
  const { classroomId } = props;
  const [step, setStep] = useState(1); // 1 = Roadmap, 2 = Topic, 3 = Quiz
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [user,setUser]=useState({});
  const [edit,setEdit]=useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoamapInClass = async () => {
      const response = await api.get('/classrooms/getRoadmapInClass', { params: { classroomId: classroomId }, withCredentials: true });
      if (response.data[0].roadmapId !== null) {
        const getRoadmap = await api.get('/roadmaps/getTopicRoadmapByUserId', { params: { roadmapId: response.data[0].roadmapId }, withCredentials: true })
        setRoadmaps([getRoadmap]);
      }

    }
    fetchRoamapInClass();
    const fetchInfor = async ()=>{
                        const response = await api.get('/profiles/get-profile',{
                        withCredentials: true
                        })
                        setUser(response.data?.profile);}
    fetchInfor();
    
  }, [])
  useEffect(() => {
      if (selectedRoadmap) {
                  const fetchAll = async()=>{
          const responseQuizById = await api.get('/quizzes/getQuizById',{params:{roadmapId:selectedRoadmap?.data.roadmap.roadmapId, classroomId:classroomId}});
          const userQuiz = responseQuizById.data[0];
          const response = await api.get('/quizzes/getQuiz',{params:{userCreateQuiz:selectedRoadmap?.data.roadmap.accountId,roadmapId:selectedRoadmap?.data.roadmap.roadmapId, classroomId:classroomId}});
          const quiz = response.data[0];
           if(quiz.userCreateQuiz === user.accountId) setEdit(true);
          if(responseQuizById.data.length !== 0)
          { 
          const mergedTopic = quiz.topics.map(topic => {
            const userTopic = userQuiz?.topics.find(t => t.topicId === topic.topicId);
            const tests = topic.tests.map(test => {
              const userTest = userTopic?.tests.find(t => t.title === test.title);
              if (userTest) {
                return userTest;
              }
              else{
                return {
                  title: test .title,
                  startTime: test.startTime,
                  endTime: test.endTime,
                  duration: test.duration,
                  durationDo: 0,
                  point: 0,
                  submit: false,
                  questions: test.questions.map(q => ({
                                        question: q.question,
                                        answers: q.answers.map(ans => ({
                                            text: ans.text,
                                            correct: ans.correct,
                                            userChoose: false // thêm field mới
                                        }))
                                    }))
                }
              }
            });
              return{
                topicId: topic.topicId,
                topicName: topic.topicName,
                tests: tests
              }
          });
          const mergedQuiz = { ...userQuiz, topics: mergedTopic };

          setQuizzes(mergedQuiz);
        }
        else{
          setQuizzes({
            userDoQuiz: user.accountId,          // id user đang làm bài
            roadmapId: quiz.roadmapId,
            classroomId: quiz.classroomId,
            topics: quiz.topics.map(topic => ({
            topicId: topic.topicId,
            topicName: topic.topicName,
            tests: topic.tests.map(test => ({
              title: test.title,
              startTime: test.startTime,
              endTime: test.endTime,
              duration: test.duration,
              durationDo: 0, // default
              point: 0, // default
              submit: false, // default
              questions: test.questions.map(q => ({
                question: q.question,
                answers: q.answers.map(ans => ({
                  text: ans.text,
                  correct: ans.correct,
                  userChoose: false // thêm field mới
                }))
              }))
            }))
          }))
          });
        }
        }
        fetchAll();
        
      }
      
    }, [selectedRoadmap]);
  const handleSelectRoadmap = (r) => {
    setSelectedRoadmap(r);
    setStep(2);
  };
  const handleSelectTopic = (tIndex) => {
    setSelectedTopic(tIndex);
    setStep(3);
  };

  const updateQuiz = async (selectedTopic, quizIndex, updatedQuiz) => {
      const copy = { ...quizzes, userDoQuiz: user.accountId };
      const index = copy.topics.findIndex(topic => topic.topicId === selectedTopic.id);

      if (index !== -1) {
        copy.topics[index].tests[quizIndex] = updatedQuiz;
      }
      //console.log("hhh",copy);
      setQuizzes(copy);
    const response = await api.post('/quizzes/doQuiz',{quiz:copy},{
      withCredentials: true
    })
    //console.log(response);
    
  };
  const submitQuiz = async (selectedTopic, quizIndex,timeLeft) => {
      const copy = { ...quizzes, userDoQuiz: user.accountId };
      const index = copy.topics.findIndex(topic => topic.topicId === selectedTopic.id);
      if (index !== -1) {
        copy.topics[index].tests[quizIndex].durationDo = copy.topics[index].tests[quizIndex].duration * 60 - timeLeft;
        const correctAnswerUser = copy.topics[index].tests[quizIndex].questions.reduce((acc, question) => {
          const correctAnswer = question.answers.find(ans => ans.correct);
          const userAnswer = question.answers.find(ans => ans.userChoose);
          if (correctAnswer && userAnswer && correctAnswer.text === userAnswer.text) {
            return acc + 1; 
          }
          return acc; 
        }, 0);
        copy.topics[index].tests[quizIndex].submit = true;
        copy.topics[index].tests[quizIndex].point = 10 * correctAnswerUser / copy.topics[index].tests[quizIndex].questions.length;
      }
      setQuizzes(copy);
    const response = await api.post('/quizzes/doQuiz',{quiz:copy},{
      withCredentials: true
    })
    //console.log(response);
  };
  const ViewPageRoadmap = (roadmap)=>{
        navigate(`/roadmap/view/${roadmap.roadmapId}`,{ state: roadmap });
    }

  return (

    <div className="container mt-4">
      {/* --- STEP 1: DANH SÁCH ROADMAP --- */}
      {step === 1 && (
        <>
          <h2 className="text-center mb-3">📌 List Roadmaps</h2>

          <ul className="list-group">
            {roadmaps.map((r) => (
              <li
                key={r.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {r.data.roadmap.name}
                <div>

                    <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={()=>ViewPageRoadmap(r.data.roadmap)}
                >
                  Xem Roadmap →
                </button>
                 
                   
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() =>{handleSelectRoadmap(r)}}
                >
                  Xem Topics →
                </button>
                </div>
               
              </li>
            )
            )}
          </ul>
        </>
      )}

      {/* --- STEP 2: DANH SÁCH TOPIC --- */}
      {step === 2 && selectedRoadmap !== null &&
        <TopicRoadmapClassroom 
          edit={edit}
          handleSelectTopic={handleSelectTopic}
          roadmaps={roadmaps}
          selectedRoadmap={selectedRoadmap}
          setStep={setStep}
        />}

      {/* --- STEP 3: FORM TẠO QUIZ --- */}
      {step === 3 && selectedTopic !== null &&
        <QuizRoadmapClassroom
          edit={edit}
          submitQuiz={submitQuiz}
          selectedTopic={selectedTopic}
          quizzes={quizzes}
          setStep={setStep}
          updateQuiz={updateQuiz} 
        />}
      
    </div>


  );
}

