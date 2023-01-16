import React from 'react'
import './Addstaff.css'

export default function Addstaff() {
  return (
    <div>
       <>
      <div className="wrapper3">
        <div className="row">Add Staff</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>
          <button className="btn">Add
          </button>
        </form>
      </div>
    </>
    </div>
  )
}
