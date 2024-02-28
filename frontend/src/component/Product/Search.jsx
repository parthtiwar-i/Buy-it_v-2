import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./search.css";
import MetaData from "../layout/MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <Fragment>
      <MetaData title={`Search a product`} />
      <form className="search-box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="search a product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
