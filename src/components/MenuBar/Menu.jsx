import { IoMenu } from "react-icons/io5";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../data/dashboard-links";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";
import SidebarLink from "../core/Dashboard/SidebarLink";
import { FaHome } from 'react-icons/fa'; 

const Menu = () => {

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  // useOnClickOutside(ref, () => setOpen(false));

  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="absolute -left-5 -top-4 ">
      <button onClick={(e) => {
        e.stopPropagation();
        setOpen(prev => (prev === false ? true : false))
      }}
        className="transition-all duration-500"
      >
        <IoMenu className="text-3xl" />
      </button>

      {open && (
        <div
          ref={ref}
          className={`bg-gray-200 w-1/2 h-full bg-blue-50 z-30 absolute top-11 -left-7 transition-all duration-500 ${open ? 'left-0' : '-left-full'}`}
        >
          <div className="h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className="flex flex-col" onClick={() => setOpen(false)}>
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null;
                return (
                  <SidebarLink key={link.id} link={link} iconName={link.icon} flag={1} />
                );
              })}
            </div>

          

            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div className="flex flex-col" >
              <SidebarLink  link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" />
              <SidebarLink  link={{ name: "Contact us", path: "/contact" }} iconName="VscSettingsGear" />
              <SidebarLink  link={{ name: "About us", path: "/about" }} iconName="VscSettingsGear" />

              <button
                className="px-8 py-2 text-sm font-medium text-richblack-300"
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
      )}
    </div>
  );
};

export default Menu;
