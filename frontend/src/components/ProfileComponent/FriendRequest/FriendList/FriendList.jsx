import React,{useState, useEffect} from "react";
import "./FriendList.css";
import axios from "axios";

export default function FriendList() {
    const [friends, setFriends] = useState([]);
    const fetchRequests = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/friends/friend-list",{
                withCredentials: true
            });
            console.log(response.data.data);
            console.log("Friend List:", response.data.data);
            setFriends(response.data.data);
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);

    const onRemove = async(id)=>{
        await axios.post("http://localhost:5000/api/friends/friend-list/remove",{id},{
            withCredentials: true
        });
        fetchRequests();
    }
    return (
    <div className="card">
        <h2>Danh sách bạn bè</h2>
        {friends?.length === 0 && <p className="empty">Không có bạn bè</p>}
        {friends?.map(friend => (
            <div key={friend.id} className="request-item">
            <div>
                <p className="email">{friend.email}</p>
            </div>
            <div className="actions">
                <button className="btn view" onClick={() => onViewProfile(friend.id)}>
                Xem profile
                </button>
                <button className="btn remove" onClick={() => onRemove(friend.id)}>
                Xóa bạn
                </button>
            </div>
            </div>
        ))}
    </div>
    );
}
