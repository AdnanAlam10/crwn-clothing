/* eslint-disable react/prop-types */
import "./Directory.styles.scss";
import CategoryItem from "../CategoryItem/CategoryItem";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;
