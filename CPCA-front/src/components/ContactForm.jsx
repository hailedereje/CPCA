import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form className="w-full">
      <div className="form-group w-full mb-8">
        <label htmlFor="name" className="text-lg block">
          Your Name
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-2xl font-sans bg-green-1 px-3 py-2 mt-2 outline-none border-none rounded-md"
          />
        </label>
      </div>
      <div className="form-group w-full mb-8">
        <label htmlFor="email" className="text-lg block">
          Your Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-2xl font-sans bg-green-1 px-3 py-2 mt-2 outline-none border-none rounded-md"
          />
        </label>
      </div>
      <div className="form-group w-full mb-8">
        <label htmlFor="message" className="text-lg block">
          Your message
          <textarea
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-2xl bg-green-1 px-3 font-sans py-2 mt-2 text-gray-1 outline-none border-none rounded-md resize-y min-h-[250px]"
          />
        </label>
      </div>
      <button
        type="submit"
        className="text-2xl bg-green-1 inline-block px-4 py-2 rounded-md cursor-pointer font-serif"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
