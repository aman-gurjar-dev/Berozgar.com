import { useEffect, useState, useRef } from "react";
import axios from "../config/axios";
import { motion, AnimatePresence } from "framer-motion";

function Chat() {
  const [tasks, setTasks] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  // Fetch current user ID
  useEffect(() => {
    axios
      .get("api/auth/fetch")
      .then((res) => setCurrentUserId(res.data.user._id))
      .catch(() => setError("Failed to identify user"));
  }, []);

  // Fetch tasks assigned to current user
  useEffect(() => {
    if (!currentUserId) return;
    axios
      .get("api/user/message/featchusers")
      .then((res) => {
        const assignedTasks = res.data.users.filter(
          (task) => task.createdBy === currentUserId
        );
        setTasks(assignedTasks);
      })
      .catch(() => setError("Failed to fetch users"));
  }, [currentUserId]);

  // Fetch chat messages for selected receiver
  useEffect(() => {
    if (!receiverId) return;
    axios
      .post("api/user/message/featchmessages", { receiverId })
      .then((res) => setChat(res.data.messages))
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to fetch messages")
      );
  }, [receiverId]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await axios.post("api/user/message/send", {
        receiverId,
        message,
      });
      setChat((prev) => [...prev, res.data.data]);
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send message");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans ml-[30vw]">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.button
              key={task._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setReceiverId(task.assignedTo)}
              className={`w-full text-left p-3 mb-2 rounded shadow-sm transition ${
                receiverId === task.assignedTo ? "bg-blue-100" : "bg-white"
              } hover:bg-blue-50`}
            >
              <div className="font-medium">{task.title}</div>
              <div className="text-xs text-gray-500">
                {task.location.area}, {task.location.city}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col p-4 bg-gray-50">
        <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow space-y-2">
          <h2 className="text-xl font-semibold mb-4">
            {receiverId ? "Chat" : "Select a task to start chatting"}
          </h2>

          <AnimatePresence>
            {chat.length === 0 && receiverId ? (
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No messages yet. Say hello 👋
              </motion.p>
            ) : (
              chat.map((msg) => {
                const isMine = String(msg.senderId) === String(currentUserId);
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2 max-w-xs break-words rounded shadow ${
                      isMine
                        ? "bg-blue-600 text-white self-end ml-auto"
                        : "bg-gray-300 text-black self-start"
                    }`}
                  >
                    {msg.message}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Input box */}
        {receiverId && (
          <form onSubmit={sendMessage} className="flex items-center mt-4 gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Send
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Chat;
