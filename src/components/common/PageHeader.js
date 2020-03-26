import React from "react";

export default function ContentHeader(props) {
  return (
    <div className="content-header">
      <h1 className="title">{props.title || " "}</h1>
      <h1 className="sub-title">{props.subTitle}</h1>
    </div>
  );
}
