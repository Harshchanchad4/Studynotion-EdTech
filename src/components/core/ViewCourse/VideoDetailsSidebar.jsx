import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";



export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const [style, setStyle] = useState("hidden");
  const [style2, setStyle2] = useState("block");

  const clickHandler1 = () => {

    setStyle(prev => (prev === "block" ? "hidden" : "block"));
    setStyle2(prev => (prev === "block" ? "hidden" : "block"));
  }
  const clickHandler2 = () => {

    setStyle(prev => (prev === "block" ? "hidden" : "block"));
    setStyle2(prev => (prev === "block" ? "hidden" : "block"));
  }


  return (
    <>
      {
        !videoBarActive ? (
          <div className="grid h-screen w-screen place-items-center">
            <div className="spinner"></div>
          </div>
        ) : (

          <div className="relative flex flex-col">
            <div className={` flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 ${style} `}>

              <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

                <div className="flex w-full items-center justify-between">
                  <div
                    onClick={clickHandler1}
                    title="back"
                    className="flex w-[35px] items-center justify-centerborder rounded-md border-richblack-700 p-1 h-10 justify-center text-white hover:scale-90 cursor-pointer"
                  >
                    <AiOutlineMenuFold size={30} />

                  </div>
                  <IconBtn text="Add Review" customClasses="ml-auto" onclick={() => setReviewModal(true)} />
                </div>

                <div className="flex flex-col">
                  <p>{courseEntireData?.courseName}</p>
                  <p className="text-sm font-semibold text-richblack-500"> {completedLectures?.length} / {totalNoOfLectures}</p>
                </div>

              </div>

              <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {


                  courseSectionData.map((course, index) => (
                    // in this course = section 
                    // , topic = subsection
                    <div className="mt-2 cursor-pointer text-sm text-richblack-5" onClick={() => setActiveStatus(course?._id)} key={index} >
                      {/* Section */}
                      <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                        <div className="w-[70%] font-semibold">
                          {course?.sectionName}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`${activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"} transition-all duration-500`} >
                            <BsChevronDown />
                          </span>
                        </div>
                      </div>

                      {/* Sub Sections */}
                      {activeStatus === course?._id && (
                        <div className="transition-[height] duration-500 ease-in-out">
                          {course.subSection.map((topic, i) => (
                            <div className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id ? "bg-yellow-200 font-semibold text-richblack-800" : "hover:bg-richblack-900"} `}
                              key={i}
                              onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                                setVideoBarActive(topic._id)
                              }}
                            >
                              <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => { }} />
                              {topic.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div className="flex w-full items-center text-xl text-white gap-2 absolute left-4 bottom-4 cursor-pointer" onClick={() => { navigate(`/dashboard/enrolled-courses`) }}>
                <div  title="back" className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"  >
                  <IoIosArrowBack size={30} />
                </div>
                <p>Back</p>
              </div>

            </div>

            <div className={`${style2}`}
              onClick={clickHandler2}>
              <button className="mt-4 border rounded-md border-richblack-700  text-white h-10 w-[80%] ml-7 cursor-pointer flex justify-center items-center gap-2 sm:text-xl text-md p-1 hover:scale-95" title="course" >

                <AiOutlineMenuUnfold />
                <p className="sm:block hidden" >Course</p>
              </button>


            </div>

          </div>
        )
      }

    </>

  )
}