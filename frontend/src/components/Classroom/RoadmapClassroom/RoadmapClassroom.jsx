import React, { useEffect, useState } from "react";
import api from "#utils/api";
import TopicRoadmapClassroom from "#components/Classroom/RoadmapClassroom/TopicRoadmapClassroom/TopicRoadmapClassroom.jsx";
import QuizRoadmapClassroom from "#components/Classroom/RoadmapClassroom/QuizRoadmapClassroom/QuizRoadmapClassroom.jsx";
export default function RoadmapClassroom(props) {
  const { classroomId } = props;
  const [step, setStep] = useState(1); // 1 = Roadmap, 2 = Topic, 3 = Quiz
  const [roadmaps, setRoadmaps] = useState([]);
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      // Backend tự động lấy user info từ token
      const response = await api.get("/roadmaps/getRoadmapByUserId");
      setMyRoadmaps(response.data.data);
    };
    fetchData();
    const fetchInfor = async () => {
      // Backend tự động lấy user info từ token
      const response = await api.get("/profiles/get-profile");
      setUser(response.data?.profile);
    };

    fetchInfor();
  }, []);
  useEffect(() => {
    const fetchRoamapInClass = async () => {
      const response = await api.get("/classrooms/getRoadmapInClass", {
        params: { classroomId: classroomId },
      });
      if (response.data[0].roadmapId !== null) {
        const getRoadmap = await api.get("/roadmaps/getTopicRoadmapByUserId", {
          params: { roadmapId: response.data[0].roadmapId },
        });
        setRoadmaps([getRoadmap]);
      }
    };
    fetchRoamapInClass();
  }, []);
  const handleAddRoadmap = async () => {
    if (selectedRoadmap !== null) {
      const response = await api.post("/classrooms/addRoadmapIntoClass", {
        classroomId: classroomId,
        roadmapId: selectedRoadmap.id,
      });
      const getRoadmap = await api.get("/roadmaps/getTopicRoadmapByUserId", {
        params: { id: selectedRoadmap.id },
      });
      setRoadmaps([getRoadmap]);
    }
  };
  const handleSelectRoadmap = (r) => {
    setSelectedRoadmap(r);
    setStep(2);
  };
  const handleSelectTopic = (tIndex) => {
    setSelectedTopic(tIndex);
    setStep(3);
  };
  useEffect(() => {
    if (selectedRoadmap) {
      const fetchAll = async () => {
        const response = await api.get("/quizzes/getQuiz", {
          params: {
            userCreateQuiz: selectedRoadmap?.data.roadmap.accountId,
            roadmapId: selectedRoadmap?.data.roadmap.roadmapId,
            classroomId: classroomId,
          },
        });
        //console.log(response)
        if (selectedRoadmap.data.roadmap.accountId === user.accountId)
          setEdit(true);
        if (response.data.length === 0) {
          setQuizzes({
            userCreateQuiz: selectedRoadmap.data.roadmap.accountId,
            roadmapId: selectedRoadmap.data.roadmap.roadmapId,
            classroomId: classroomId,
            topics: selectedRoadmap.data.roadmap.nodes
              .filter((t) => t.type === "topic")
              .map((node) => ({
                topicId: node.id,
                topicName: node.data.label,
                tests: [
                  {
                    title: "",
                    startTime: "",
                    endTime: "",
                    duration: 30,
                    questions: [
                      {
                        question: "",
                        answers: [{ text: "", correct: false }],
                      },
                    ],
                  },
                ],
              })),
          });
        } else {
          setQuizzes(response.data[0]);
        }
      };
      fetchAll();
    }
  }, [selectedRoadmap]);

  const addQuiz = async (selectedTopic, newQuiz) => {
    const copy = { ...quizzes };
    const index = copy.topics.findIndex(
      (topic) => topic.topicId === selectedTopic.id
    );
    if (index !== -1) {
      copy.topics[index].tests = [...copy.topics[index].tests, newQuiz];
    }
    setQuizzes(copy);
    const response = await api.post("/quizzes/updateQuiz", { quiz: copy });
    //console.log(response);
  };
  const updateQuiz = async (selectedTopic, quizIndex, updatedQuiz) => {
    const copy = { ...quizzes };
    const index = copy.topics.findIndex(
      (topic) => topic.topicId === selectedTopic.id
    );

    if (index !== -1) {
      copy.topics[index].tests[quizIndex] = updatedQuiz;
    }
    setQuizzes(copy);
    const response = await api.post("/quizzes/updateQuiz", { quiz: copy });
    //console.log(response);
  };
  const removeQuiz = async (selectedTopic, quizIndex) => {
    const copy = { ...quizzes };
    const index = copy.topics.findIndex(
      (topic) => topic.topicId === selectedTopic.id
    );
    if (index !== -1) {
      copy.topics[index].tests.splice(quizIndex, 1);
    }
    setQuizzes(copy);
    const response = await api.post("/quizzes/updateQuiz", { quiz: copy });
    //console.log(response);
  };

  return (
    <div className="container mt-4">
      {/* --- STEP 1: DANH SÁCH ROADMAP --- */}
      {step === 1 && (
        <>
          <h2 className="text-center mb-3">📌 List Roadmaps</h2>
          <div className="input-group mb-3 ">
            <select
              className="form-select me-2"
              value={selectedRoadmap?.name}
              onChange={(e) => {
                const roadmap = myRoadmaps.find((i) => i.id == e.target.value);
                setSelectedRoadmap(roadmap);
              }}
            >
              <option value="">Select Roadmaps</option>
              {myRoadmaps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddRoadmap}
            >
              + Add Roadmap
            </button>
          </div>

          <ul className="list-group">
            {roadmaps !== undefined &&
              roadmaps.map((r) => (
                <li
                  key={r.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {r.data.roadmap.name}
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      handleSelectRoadmap(r);
                    }}
                  >
                    Xem Topics →
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}

      {/* --- STEP 2: DANH SÁCH TOPIC --- */}
      {step === 2 && selectedRoadmap !== null && (
        <TopicRoadmapClassroom
          edit={edit}
          handleSelectTopic={handleSelectTopic}
          roadmaps={roadmaps}
          selectedRoadmap={selectedRoadmap}
          setStep={setStep}
        />
      )}

      {/* --- STEP 3: FORM TẠO QUIZ --- */}
      {step === 3 && selectedTopic !== null && (
        <QuizRoadmapClassroom
          edit={edit}
          selectedTopic={selectedTopic}
          quizzes={quizzes}
          setStep={setStep}
          addQuiz={addQuiz}
          updateQuiz={updateQuiz}
          removeQuiz={removeQuiz}
        />
      )}
    </div>
  );
}
