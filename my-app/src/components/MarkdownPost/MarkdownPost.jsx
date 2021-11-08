import React, { useState } from "react";
import gfm from "remark-gfm";
import Markdown from "../Common/Markdown";
import "./MarkdownPost.css";
function MarkdownPost() {
  const [input, setInput] = useState("");
  // console.log(input);
  return (
    <div className="markdown">
      <textarea
        className="markdown__textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <Markdown
        remarkPlugins={[gfm]}
        children={input}
        className="markdown__convert"
      />
    </div>
  );
}

export default MarkdownPost;
