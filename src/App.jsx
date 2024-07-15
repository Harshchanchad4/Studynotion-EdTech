import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/AboutPage'
import Contact from './pages/Contact'
import MyProfile from './components/core/Dashboard/MyProfile'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings/index"
import Dashboard from './pages/DashBoard'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.jsx'
import Cart from "./components/core/Dashboard/Cart/index.jsx"
import { ACCOUNT_TYPE } from './utils/constants.js'
import { useSelector } from 'react-redux'
import AddCourse from './components/core/Dashboard/AddCourse/index.jsx'
import MyCourses from './components/core/Dashboard/MyCourses.jsx'
import EditCourse from './components/core/Dashboard/EditCourse/'
import Catalog from './pages/Catalog.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import Instructor from './components/core/Dashboard/Instructor.jsx'
import ViewCourse from "./pages/ViewCourse.jsx"
import VideoDetails from './components/core/ViewCourse/VideoDetails.jsx'
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory.jsx'



function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path="/signup" element={

          <OpenRoute>

            <Signup />
          </OpenRoute>


        } />
        <Route path="/login" element={


          <OpenRoute>
            <Login />
          </OpenRoute>
        }
        />
        <Route path='/forgot-password' element={

          <OpenRoute>

            <ForgotPassword />
          </OpenRoute>

        }></Route>
        
        <Route path='/update-password/:id' element={

          <OpenRoute>

            <UpdatePassword />
          </OpenRoute>

        }></Route>
        <Route path='/verify-email' element={

          <OpenRoute>

            <VerifyEmail />

          </OpenRoute>

        }></Route>
        <Route path='/about' element={


          <About />


        }></Route>
        <Route path='/contact' element={


          <Contact />


        }></Route>


        <Route element={<PrivateRoute> <Dashboard /> </PrivateRoute>} >

          <Route path="dashboard/my-profile" element={< MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
              </>
            )
          }

          {

            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
              </>
            )
          }
        </Route>

        <Route element={<PrivateRoute> <ViewCourse /> </PrivateRoute>}>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
            </>
          )
          }

        </Route>

        <Route path='*' element={<Error />} />



      </Routes>
    </div>
  )
}

export default App
