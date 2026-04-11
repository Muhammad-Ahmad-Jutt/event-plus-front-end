import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Detail</h1>
      <p>Event ID: {id}</p>
      {/* Add more details here */}
    </div>
  );
}