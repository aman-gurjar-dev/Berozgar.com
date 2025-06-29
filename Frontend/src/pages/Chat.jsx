import { useEffect, useState, useRef } from "react";
import axios from "../config/axios";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

function Chat() {
  const [tasks, setTasks] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("api/auth/fetch")
      .then((res) => {
        setCurrentUserId(res.data.user._id);
        setUserRole(res.data.user.role);
      })
      .catch(() => setError("Failed to identify user"));
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const endpoint =
      userRole === "poster"
        ? "api/user/message/featchusers"
        : "api/user/message/convercation";

    axios
      .get(endpoint)
      .then((res) => {
        const data =
          userRole === "poster"
            ? res.data.users.filter((t) => t.createdBy === currentUserId)
            : res.data.tasks;
        setTasks(data);
      })
      .catch(() => setError("Failed to fetch users/tasks"));
  }, [currentUserId, userRole]);

  useEffect(() => {
    if (!receiverId) return;

    axios
      .post("api/user/message/featchmessages", { receiverId })
      .then((res) => setChat(res.data.messages))
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to fetch messages")
      );
  }, [receiverId]);

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
    <div
      className={`flex h-screen w-full text-white font-sans ${
        isOpen ? `ml-72` : `ml-0`
      }`}
    >
      <div className="w-1/4 shadow-xl border-r border-gray-800 p-5 overflow-y-auto">
        <h2
          className={`text-xl font-bold text-white mb-6 ${
            isOpen ? "mt-0" : "mt-12"
          }`}
        >
          Chats
        </h2>

        <AnimatePresence>
          {tasks.map((task) => (
            <motion.button
              key={task._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setReceiverId(task.assignedTo)}
              className={`w-full text-left p-4 mb-3 rounded-xl relative z-10 transition font-medium shadow-md ${
                receiverId === task.assignedTo
                  ? "bg-indigo-900 border-l-4 border-indigo-400"
                  : "bg-[#1e293b]"
              } hover:bg-[#334155]`}
            >
              <div className="text-white">{task.title}</div>
              <div className="text-xs text-gray-400">
                {task.location.area}, {task.location.city}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col p-6 ">
        <div className="flex-grow overflow-y-auto  p-6 rounded-2xl shadow-lg space-y-3 border border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-300 mb-4">
            {receiverId ? "Conversation" : "Select a task to start chat"}
          </h2>

          <AnimatePresence>
            {chat.length === 0 && receiverId ? (
              <motion.p
                className="text-gray-400"
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-xs md:max-w-sm px-4 py-2 rounded-xl shadow-md ${
                      isMine
                        ? "bg-indigo-600 text-white self-end ml-auto"
                        : "bg-slate-700 text-white self-start"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span className="block text-[10px] mt-1 text-gray-300">
                      {moment(msg.createdAt).format("h:mm A")}
                    </span>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          <div ref={chatEndRef} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {receiverId && (
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-3 mt-4 relative z-10"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-3 bg-[#1e293b] border border-gray-600 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
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
