"use client";

import React from "react";

const FeedMessageForm: React.FC = () => {
  return (
    <div className="flex flex-col h-relative justify-between">
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Post
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
          placeholder="Introduce your post"
        ></textarea>
      </form>
    </div>
  );
};

export default FeedMessageForm;
