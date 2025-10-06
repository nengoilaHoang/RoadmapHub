import React, { useState } from "react";
import "./AddStudentForm.css";
import api from '../../../../utils/api.js'
import AlertError from '#components/SignUp/AlertError.jsx';

export default function AddStudentForm(props) {
  const {classroomId} = props;
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const [alertEmail,setAlertEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const response = await api.post('/studentclassrooms/add', { email: email,classroomId:classroomId },{
      withCredentials: true
    });
    //console.log(response.data);
    if (response.data.success === false) {
        setError(response.data.message);
        setAlertEmail(true);
    }
    else setAlertEmail(false);
    setEmail("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Add students</h2>
      <input
        type="email"
        placeholder="Enter email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      {alertEmail&&<AlertError content={error}/>}
      <button onClick={handleSubmit} className="btn send">Send</button>
    </form>
  );
}
