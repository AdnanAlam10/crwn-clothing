/* eslint-disable react/prop-types */
import "./directory.styles.scss";
import CategoryItem from "../categoryItem/categoryItem";

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
