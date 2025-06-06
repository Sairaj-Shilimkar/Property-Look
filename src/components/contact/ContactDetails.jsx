import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaUser,
  FaMobileAlt,
  FaCommentDots,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone.trim())) {
      validationErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.message.trim()) validationErrors.message = "Message is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      access_key: "e0972470-5cfc-4e9a-90fe-9559976760e2",
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! Your message has been sent.");
        setFormData({ name: "", phone: "", message: "" });
        setErrors({});
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try later.");
    }
  };

  return (
    <section className="bg-white md:py-5 md:px-5 mb-5 mt-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto shadow-lg flex flex-col md:flex-row overflow-hidden border border-sky-300"
      >
        {/* Left Side */}
        <div className="md:w-1/2 bg-sky-50 p-8 md:p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-sky-800 mb-5 text-center md:text-left">Get in Touch</h2>
          <div className="space-y-4 text-black text-lg">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-sky-500 text-xl" />
              <p>Pune, Maharashtra</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-sky-500 text-xl" />
              <p>+91 9657308229</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-500 text-xl" />
              <a
                href="https://wa.me/9657308229"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-900 transition"
              >
                +91 9657308229
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-sky-500 text-xl" />
              <p>propertylook.pl@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-sky-800 mb-2 text-center md:text-left">Contact Us</h2>
          <p className="text-sky-700 mb-4 text-center md:text-left">
            Have questions? Fill out the form and we’ll get back to you shortly.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.name ? "border-red-500" : "border-sky-300"
                } text-sky-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="relative">
              <FaMobileAlt className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" />
              <input
                type="tel"
                name="phone"
                placeholder="Your Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.phone ? "border-red-500" : "border-sky-300"
                } text-sky-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Message */}
            <div className="relative">
              <FaCommentDots className="absolute top-4 left-4 text-gray-500" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.message ? "border-red-500" : "border-sky-300"
                } text-sky-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-sky-800 hover:bg-sky-600 text-white font-semibold rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
