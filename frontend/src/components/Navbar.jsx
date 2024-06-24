import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useState(false)

  const currentUser = false

  return (
    <header className="bg-slate-200 shadow-lg sticky">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Hospital</span>
            <span className="text-slate-900">System</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to={"/appointment"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Appointment
            </li>
          </Link>

          <Link
            to={"/doctors"}
            className="hidden sm:inline text-slate-700 hover:underline"
          >
            <li>Doctors</li>
          </Link>

          <Link
            to={"/about"}
            className="hidden sm:inline text-slate-700 hover:underline"
          >
            <li>About Us</li>
          </Link>

          <Link to={"/sign-in"}>
            <li className=" text-slate-700 hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
