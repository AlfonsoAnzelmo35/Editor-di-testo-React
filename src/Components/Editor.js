import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "./../css/Editor.css" ;

import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

function Editor(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  return (
    <div className="editor-container">
      <ReactMde
        value={props.currentNote.body}
        onChange={props.handleUpdateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        heightUnits = {200}
      />
    </div>
  );
}

export {Editor}