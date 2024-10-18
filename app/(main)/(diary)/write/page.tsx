"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlock from "@tiptap/extension-code-block";

const WritePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, HorizontalRule, CodeBlock],
    content: "<p>Hello World! 🌍️</p>",
    editorProps: {
      attributes: {
        class:
          "format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none",
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const toggleList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const toggleBlockquote = () => {
    editor?.chain().focus().toggleBlockquote().run();
  };

  const insertHorizontalRule = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  const toggleCodeBlock = () => {
    editor?.chain().focus().toggleCodeBlock().run();
  };

  const setParagraph = () => {
    editor?.chain().focus().setParagraph().run();
  };

  const toggleHeading = (level: number) => {
    editor
      ?.chain()
      .focus()
      .toggleHeading({ level: level as any })
      .run();
  };

  return (
    <div className="flex flex-col h-relative justify-between">
      <div className="flex-grow max-h-full overflow-y-auto">
        <div className="p-2 bg-white dark:bg-gray-800">
          <EditorContent
            editor={editor}
            className="prose dark:prose-invert max-w-none"
          />
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
        <div className="p-2 overflow-x-auto">
          <details>
            <summary className="text-xs text-gray-500">문서도구</summary>{" "}
            <div className="flex space-x-2">
              <button className="text-xs text-gray-500" onClick={toggleList}>
                목록
              </button>
              <button
                className="text-xs text-gray-500"
                onClick={toggleOrderedList}
              >
                순서 목록
              </button>
              <button
                className="text-xs text-gray-500"
                onClick={toggleBlockquote}
              >
                인용구
              </button>
              <button
                className="text-xs text-gray-500"
                onClick={insertHorizontalRule}
              >
                구분선
              </button>
              <button
                className="text-xs text-gray-500"
                onClick={toggleCodeBlock}
              >
                코드
              </button>
              <button className="text-xs text-gray-500" onClick={setParagraph}>
                단락
              </button>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                  key={level}
                  className="xs"
                  onClick={() => toggleHeading(level)}
                >
                  H{level}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
