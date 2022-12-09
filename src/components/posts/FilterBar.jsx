import React from "react";
import { Link, NavLink } from "react-router-dom"

const FilterBar = ({ setUpdater, updater, }) => {

  return (
    <div id="filter-bar">
      <NavLink to="all"><button onClick={() => setUpdater(!updater)}>All Posts</button></NavLink>
      <NavLink to="user"><button onClick={() => setUpdater(!updater)}>Your Posts</button></NavLink>
      <NavLink to="favorites"><button onClick={() => setUpdater(!updater)}>Favorites</button></NavLink>
    </div>
  )
}

export default FilterBar;