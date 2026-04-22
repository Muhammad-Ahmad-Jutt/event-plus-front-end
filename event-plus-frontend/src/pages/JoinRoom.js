import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/event-plus-bg.png";

export default function JoinRoomLink() {
const navigate = useNavigate()
const join_room_function = (room_id) => {
    navigate(`/room/${room_id}`)
}
    return (
        <>
        <style>{`    
            html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            }

            .pageImg {
            padding: 24px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            font-family: Arial, sans-serif;
            }

            .container {
            background: #FAF9F6;
            width: 100%;
            max-width: 940px;
            height: 200px;
            border-radius: 12px;
            border-width: 2px;
            border-color: black;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 24px;
            margin-top: 20px;
            }

            .btnPrimary {
            background: #00BA46;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            height: 40px;
            }

            .title {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            }

            .topheaderview {
            background: #FFEEE7;
            border-radius: 10px;
            display: flex;
            align-items: center;
            width: 100%;
            height: 60px;
            padding: 20px;
            }

            .sectionTitle {
            font-weight: 800;
            font-size: 20px;
            margin: 0;
            text-align: center;
            color: red;
            }

            .headerBox {
             margin-bottom: 25px;
            }

            .inputBox {
            border-color: black;
            border-width: 1px;
            width: 300px;
            height: 50px;
            margin-right: 15px;
            border-radius: 10px;
            padding: 10px;
            }

        `}</style>

        <div className="pageImg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "-20px",
          marginBottom: "-40px",
        }}>
        <div className="container">
           
        <div className="headerBox">
            <div className="topheaderview">
              <h1 className="sectionTitle">Join Room</h1>
            </div>
        </div>
            
            <input placeholder="Enter room ID" id="room-id" className="inputBox" />
            <button onClick={() => {join_room_function(document.getElementById('room-id').value)}} className="btnPrimary">Join</button>

        </div>
        </div>
        </>
    )
}