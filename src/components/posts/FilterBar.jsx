import React from "react";
import { Link, NavLink } from "react-router-dom"

const FilterBar = ({
  token,
  setUpdater,
  updater,
  searchActive,
  setSearchActive,
  userSearch,
  setUserSearch,
  descriptionSearch,
  setDescriptionSearch }) => {



  return (
    <div id="filter-bar">
      <NavLink
        to="all"
        className="nav-link"
        onClick={() =>
          setUpdater(!updater)}
        style={({ isActive }) => ({
          color: isActive ? '#000' : '#000',
          background: isActive ? 'rgb(217, 231, 255)' : ''
        })}>All Posts</NavLink>

      {token
        ? <><NavLink
          to="user"
          className="nav-link"
          onClick={() =>
            setUpdater(!updater)}
          style={({ isActive }) => ({
            color: isActive ? '#000' : '#000',
            background: isActive ? 'rgb(217, 231, 255)' : ''
          })}>Your Posts</NavLink>
          <NavLink
            to="favorites"
            className="nav-link"
            onClick={() => setUpdater(!updater)}
            style={({ isActive }) => ({
              color: isActive ? '#000' : '#000',
              background: isActive ? 'rgb(217, 231, 255)' : ''
            })}>Favorites</NavLink></>
        : <></>
      }


      <button onClick={() => setSearchActive(!searchActive)}>Search</button>
      {searchActive
        ? <div id='search-box'>
          <label htmlFor="user">User</label>
          <input value={userSearch} type="text" onChange={(event) => { setUserSearch(event.target.value); setUpdater(!updater) }} />
          <label htmlFor="description">Description</label>
          <textarea value={descriptionSearch} type="text" rows="6" onChange={(event) => { setDescriptionSearch(event.target.value); setUpdater(!updater); console.log(descriptionSearch) }} />
        </div>
        : <></>
      }
    </div>
  )
}

export default FilterBar;