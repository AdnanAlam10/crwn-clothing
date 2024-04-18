/* eslint-disable react/prop-types */
import DirectoryItem from "../directoryItem/directoryItem";

import "./directory.styles.scss";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;
