import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <div className="rounded-xl border border-richblack-800 overflow-x-auto">
        <div>
          <div className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100 text-sm font-medium uppercase">
            <div className="flex-1 text-left">Courses</div>
            <div className="hidden md:block">Duration</div>
            <div className="hidden md:block">Price</div>
            <div className="text-left">Actions</div>
          </div>
        </div>
        <div>
          {courses?.length === 0 ? (
            <div className="py-10 text-center text-2xl font-medium text-richblack-100">
              No courses found
            </div>
          ) : (
            courses?.map((course) => (
              <div key={course._id} className=" relative flex flex-col md:flex-row gap-x-10 border-b border-richblack-800 px-6 py-8">
                <div className="flex flex-1 gap-x-4 overflow-x-hidden">
                  <img src={course?.thumbnail} alt={course?.courseName} className="h-[120px] w-[150px] md:w-[220px] rounded-lg object-cover" />
                  <div className="flex flex-col justify-between mt-4 md:mt-0">
                    <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..." : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} /> Drafted
                      </p>
                    ) : (
                      <div className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
                  <div className="text-sm font-medium text-richblack-100 hidden md:block">2hr 30min</div>
                  <div className="text-sm font-medium text-richblack-100 hidden md:block">₹{course.price}</div>

                  <div className="absolute top-3 right-3 text-sm font-medium text-richblack-100 flex gap-2">
                    <button disabled={loading} onClick={() => { navigate(`/dashboard/edit-course/${course._id}`) }} title="Edit" className="transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                      <FiEdit2 size={20} />
                    </button>
                    <button disabled={loading} title="Delete" className="transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => { },
                          btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                        })
                      }}>
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
