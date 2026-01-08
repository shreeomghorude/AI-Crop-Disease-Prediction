// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import HeaderSection from "./HeaderSection";

// function NavbarFinal() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location.pathname]);

//   const handleSignout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <HeaderSection />

//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//         <div className="container-fluid px-4">

//           <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
//             Agri-Assist
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#agriNavbar"
//             aria-controls="agriNavbar"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="agriNavbar">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

//               <li className="nav-item">
//                 <Link
//                   to="/"
//                   className={`px-3 py-2 rounded-pill fw-bold mx-2 ${
//                     isActive("/")
//                       ? "bg-success text-white"
//                       : "text-success bg-white border border-success"
//                   }`}
//                 >
//                   Home
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   to="/features"
//                   className={`px-3 py-2 rounded-pill fw-bold mx-2 ${
//                     isActive("/features")
//                       ? "bg-success text-white"
//                       : "text-success bg-white border border-success"
//                   }`}
//                 >
//                   Features
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   to="/aboutus"
//                   className={`px-3 py-2 rounded-pill fw-bold mx-2 ${
//                     isActive("/aboutus")
//                       ? "bg-success text-white"
//                       : "text-success bg-white border border-success"
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//               </li>

//               {isLoggedIn && (
//                 <li className="nav-item">
//                   <button
//                     onClick={handleSignout}
//                     className="px-3 py-2 rounded-pill fw-bold mx-2 text-success bg-white border border-success"
//                   >
//                     Sign Out
//                   </button>
//                 </li>
//               )}

//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavbarFinal;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import "../styles/navbarFix.css";

function NavbarFinal() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleSignout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <HeaderSection />

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm custom-navbar">
        <div className="container-fluid px-4">

          <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
            Agri-Assist
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#agriNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="agriNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-pill ${isActive("/") ? "active-pill" : ""}`}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/features"
                  className={`nav-pill ${isActive("/features") ? "active-pill" : ""}`}
                >
                  Features
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/aboutus"
                  className={`nav-pill ${isActive("/aboutus") ? "active-pill" : ""}`}
                >
                  Dashboard
                </Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    onClick={handleSignout}
                    className="nav-pill"
                  >
                    Sign Out
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarFinal;
