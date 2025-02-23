import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaUsers } from "react-icons/fa";
import { Backbutton } from "../components/Backbutton";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    userType: "Student",
    name: "",
    email: "",
    feedback: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/school/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage("🎉 Feedback submitted successfully!");
        setFormData({ userType: "Student", name: "", email: "", feedback: "" });
      } else {
        setMessage("⚠️ Failed to submit feedback. Try again.");
      }
    } catch (error) {
      setMessage("❌ Error submitting feedback. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 bg-[url('https://plus.unsplash.com/premium_photo-1681843661864-3f46bfb1a4fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
      {/* Left-aligned Back Button */}
  <div className="w-full flex justify-start">
    <Backbutton />
  </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Dropdown */}
          <div className="flex items-center border rounded-lg p-2">
            <FaUsers className="text-gray-500 mr-2" />
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full focus:outline-none bg-transparent"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
            </select>
          </div>

          {/* Name Input */}
          <div className="flex items-center border rounded-lg p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Your Name"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Your Email"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Feedback Textarea */}
          <div className="flex items-start border rounded-lg p-2">
            <FaCommentDots className="text-gray-500 mr-2 mt-1" />
            <textarea 
              name="feedback" 
              value={formData.feedback} 
              onChange={handleChange} 
              required 
              placeholder="Write your feedback..."
              className="w-full focus:outline-none resize-none h-24"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            {loading ? "Submitting..." : <>Submit <FaPaperPlane className="ml-2" /></>}
          </motion.button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center text-gray-700"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
