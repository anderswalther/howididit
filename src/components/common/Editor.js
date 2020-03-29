import React, { useRef } from "react";

function Editor({ name, value, onChange }) {
  const textArea = useRef();

  function dispatchChangeEvent(element) {
    var event = new Event("change", { bubbles: true });
    element.dispatchEvent(event);
  }

  function setNewValue(element, newValue) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(element, newValue);
    dispatchChangeEvent(element);
  }

  function addBlockStyling(e, blockType) {
    e.preventDefault();
    const el = textArea.current;
    const selectStart = el.selectionStart;
    const selectEnd = el.selectionEnd;
    let content = el.value;
    content = [
      content.slice(0, selectStart),
      blockType.start,
      content.slice(selectStart, selectEnd),
      blockType.end,
      content.slice(selectEnd)
    ].join("");
    setNewValue(el, content);
  }

  function handleTabPressed(e) {
    if (e.key === "Tab") {
      const element = textArea.current;
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;

      let content = value;
      content = [
        content.slice(0, selectionStart),
        "  ",
        content.slice(selectionEnd)
      ].join("");
      setNewValue(element, content);
      element.selectionStart = element.selectionEnd = selectionStart + 2;
    }
  }

  return (
    <>
      <label htmlFor="content">Content</label>
      <button onClick={e => addBlockStyling(e, CODE_BLOCK)}>code block</button>
      <button onClick={e => addBlockStyling(e, CODE_INLINE)}>
        code inline
      </button>
      <button onClick={e => addBlockStyling(e, BOLD_BLOCK)}>bold</button>
      <textarea
        ref={textArea}
        id="content"
        name="content"
        rows="15"
        cols="50"
        value={value}
        onChange={e => {
          onChange(e);
        }}
        onKeyDown={e => handleTabPressed(e)}
      ></textarea>
      <label htmlFor="tags">Tags</label>
    </>
  );
}
export default Editor;

export const CODE_BLOCK = {
  start: "<c>",
  end: "</c>",
  actualStart: "<div class='highlight'>",
  actualEnd: "</div>"
};

export const CODE_INLINE = {
  start: "<ci>",
  end: "</ci>",
  actualStart: "<span class='highlight'>",
  actualEnd: "</span>"
};

export const BOLD_BLOCK = {
  start: " __b ",
  end: " b__ ",
  actualStart: "<b>",
  actualEnd: "</b>"
};
