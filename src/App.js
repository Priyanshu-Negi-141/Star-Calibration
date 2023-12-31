import {useEffect} from "react";
import "./styles.css";
import { Sidenav, Navbar, Chat} from "./component/index";
import UserManagement from "./component/HRM/UserManagement";
import { FiSettings } from "react-icons/fi";
import {
  Routes,
  Route
} from "react-router-dom";
import {} from "./data/SidebarItem.json";
import { useStateContext } from "./contexts/ContextProvider";
import {
  CaValidation,
  Calibration,
  CalibrationSrfForm,
  HvacValidation,
  Plc_csvValidation,
  SteamQualityTestValidation,
  ThermalValidation,
} from "./component/SRF";
import TodaysCheckIn from "./component/HRM/TodaysCheckIn";
import Clients from "./component/clients/Clients";
import { ThemeSetting } from "./component/themeSetting";
import {
  AddEmployee,
  EmployeList,
  EmployeeJoiningFormData,
  EmployeeNewList,
  ExpensesList,
  LeaveApplication,
  ViewAttendance,
  EditEmployeeData,
} from "./component/HRM/userManagement/index";
import { AddClient, ClientsList } from "./component/clients";
import { MyProfile } from "./component/navBar/";
import {
  PurchaseRequisition,
  PurchaseReqForm
} from "./component/HRM/purchaseRequisition/index";
import {
  CalibrationSOP,
  ElectroTechnical,
  HVAV_SOP,
  MasterInstrument,
  Mechanical,
  Miscellnious_SOP,
  PrimarySecondary,
  SOP,
  ThermalSOP,
  UnitsParameter,
} from "./component/Quality/index";
import {
  CalibrationCheckIN,
  CAValidation,
  HVACValidationCheckIN,
  PLC_CSV_ValidationCheckIn,
  SteamQualityTest,
  ThermalValidationCheckIN,
} from "./component/HRM/todaysCheckIn/index";
import EmployeeDayReportData from "./component/HRM/EmployeeDayReportData";
import MasterInstrumentList from "./component/Quality/masterInstrument/masterList/MasterInstrumentList";
import {
  CalibrationMasterInstrumentList,
  HVACMasterInstrumentList,
  ThermalMasterInstrumentList,
} from "./component/Quality/masterInstrument/masterList/CalibrationMaster";
import {
  AddInstrumentDetails,
  DeviceDetails,
  ReviewPage,
} from "./component/FormPage";
import { HomePage } from "./component/HomePage";
import { AccessRightHomePage } from "./component/AccessRight";
import {
  CalibrationServices,
  InstrumentTableList,
  SRFList,
} from "./component/Services";
import { IndividualLocation } from "./component/HRM/todaysCheckIn/Location";
import { MainLoginPage, PinGeneratePage, PinLoginPage } from "./component/EmployeeLogin";

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    loggedIn,
    checkLoggedIn,
    fetchIndividualEmployeeData,
  } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    fetchIndividualEmployeeData();
  }, []);

  return (
    <div>
      {!loggedIn ? (
        <MainLoginPage />
      ) : (
        <div className={currentMode === "Dark" ? "dark" : ""}>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: 1000 }}>
              <div className="tooltip" content="Setting" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  className="text-3xl p-3 hover:bg-light-gray text-white"
                  style={{ background: currentColor, borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </div>
            </div>
            {activeMenu ? (
              <div className="fixed w-64 sidebar no-scrollbar dark:bg-secondary-dark-bg bg-white z-20">
                <Sidenav />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidenav />
              </div>
            )}

            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen sm:ml-64 md:ml-64 w-full"
                  : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen "
              }
            >
              <div className="z-10 static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <EmployeeJoiningFormData />
              </div>
              <div className="m-5">
                {themeSettings && <ThemeSetting />}
                <Routes>
                  {/* Home Page */}

                  <Route path="/" element={<HomePage />} />
                  <Route path="/pin-generate" element={<PinGeneratePage />} />
                  <Route path="/pin-login" element={<PinLoginPage />} />
                  {/* NavBar Links Page's */}
                  <Route path="/myProfile" element={<MyProfile />} />
                  {/* HRM Links */}
                  <Route path="/addemployee" element={<AddEmployee />} />
                  <Route path="/employeelist" element={<EmployeList />} />
                  <Route
                    path="/editemployeedata/:id"
                    element={<EditEmployeeData />}
                  />
                  <Route path="/usermanagement" element={<UserManagement />} />
                  {/* User ManageMent Sub Links */}
                  <Route
                    path="/usermanagement/employeenewlist"
                    element={<EmployeeNewList />}
                  />
                  <Route
                    path="/usermanagement/addemployee"
                    element={<AddEmployee />}
                  />
                  <Route
                    path="/usermanagement/employeelist"
                    element={<EmployeList />}
                  />
                  <Route
                    path="/usermanagement/viewAttendance"
                    element={<ViewAttendance />}
                  />
                  <Route
                    path="/usermanagement/leaveApplication"
                    element={<LeaveApplication />}
                  />
                  <Route
                    path="/usermanagement/expenseList"
                    element={<ExpensesList />}
                  />
                  {/* Today's CheckIn Links */}
                  <Route path="/todayscheckin" element={<TodaysCheckIn />} />
                  <Route path="/view-map/:userName/:id" element={<IndividualLocation />} />
                  {/* Today's CheckIn SubFolder Link */}
                  <Route
                    path="/todaysCheckIn/calibrationcheckIn"
                    element={<CalibrationCheckIN />}
                  />
                  <Route
                    path="/todaysCheckIn/caValidationcheckIn"
                    element={<CAValidation />}
                  />
                  <Route
                    path="/todaysCheckIn/hvacValidationcheckIn"
                    element={<HVACValidationCheckIN />}
                  />
                  <Route
                    path="/todaysCheckIn/plccsvValidationcheckIn"
                    element={<PLC_CSV_ValidationCheckIn />}
                  />
                  <Route
                    path="/todaysCheckIn/steamQualityTestcheckIn"
                    element={<SteamQualityTest />}
                  />
                  <Route
                    path="/todaysCheckIn/thermalValidationcheckIn"
                    element={<ThermalValidationCheckIN />}
                  />

                  {/* Day Report */}
                  <Route
                    path="/employeeDayReportData"
                    element={<EmployeeDayReportData />}
                  />
                  {/* Purchase Requisition */}
                  <Route
                    path="/purchaseRequisition"
                    element={<PurchaseRequisition />}
                  />
                  {/* Purchase Requisition subfolder*/}
                  <Route
                    path="/purchaseReqForm"
                    element={<PurchaseReqForm />}
                  />
                  {/* Quality Link's */}
                  <Route path="/unitParameter" element={<UnitsParameter />} />
                  <Route
                    path="/masterInstrument"
                    element={<MasterInstrument />}
                  />
                  <Route path="/sop" element={<SOP />} />
                  {/* SubFolder MasterInstrument */}
                  <Route
                    path="/masterInstrument/primarySecondary"
                    element={<PrimarySecondary />}
                  />
                  <Route
                    path="/masterInstrument/masterInstrumentList"
                    element={<MasterInstrumentList />}
                  />
                  <Route
                    path="/masterInstrument/Calibration/:streamId"
                    element={<CalibrationMasterInstrumentList />}
                  />
                  <Route
                    path="/masterInstrument/HVAC/:streamId"
                    element={<HVACMasterInstrumentList />}
                  />
                  <Route
                    path="/masterInstrument/Thermal/:streamId"
                    element={<ThermalMasterInstrumentList />}
                  />

                  {/* SubFolder MasterInstrument End's*/}
                  {/* SubFolder SOP */}
                  <Route path="/calibrationSOP" element={<CalibrationSOP />} />
                  <Route path="/HvacSOP" element={<HVAV_SOP />} />
                  <Route
                    path="/miscellniousSOP"
                    element={<Miscellnious_SOP />}
                  />
                  <Route
                    path="/electroTechnical"
                    element={<ElectroTechnical />}
                  />
                  <Route path="/mechanical" element={<Mechanical />} />
                  <Route path="/thermalSOP" element={<ThermalSOP />} />

                  {/* SubFolder SOP End's */}
                  {/* Quality end's here */}
                  {/* Services Start Here */}
                  <Route
                    path="/CalibrationService"
                    element={<CalibrationServices />}
                  />
                  <Route
                    path="/CalibrationService/SRFList"
                    element={<SRFList />}
                  />
                  <Route
                    path="/instrument-table/:clientName/:id"
                    element={<InstrumentTableList />}
                  />

                  {/* Services End's Here */}

                  {/* SRF Link's */}
                  <Route path="/calibration" element={<Calibration />} />
                  {/* SRF Calibration Link's */}
                  <Route
                    path="/calibrationSrfForm"
                    element={<CalibrationSrfForm />}
                  />
                  <Route
                    path="/instrument-certificate/review/:isSelected/:instrumentName/:id"
                    element={<ReviewPage />}
                  />
                  <Route
                    path="/instrument-details/:clientName/:id"
                    element={<AddInstrumentDetails />}
                  />
                  <Route
                    path="/device-details/:instrumentName/:id"
                    element={<DeviceDetails />}
                  />
                  {/* SRF Calibration Link's end */}
                  <Route path="/cavalidation" element={<CaValidation />} />
                  <Route path="/hvacvalidation" element={<HvacValidation />} />
                  <Route
                    path="/thermalValidation"
                    element={<ThermalValidation />}
                  />
                  <Route
                    path="/plccsvValidation"
                    element={<Plc_csvValidation />}
                  />
                  <Route
                    path="/steamQualification"
                    element={<SteamQualityTestValidation />}
                  />
                  <Route
                    path="/thermalValidation"
                    element={<ThermalValidation />}
                  />
                  {/* SRF Link Start here's */}

                  {/* Account's Links */}

                  {/* Client's Link's */}
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/addClient" element={<AddClient />} />
                  <Route
                    path="/clients/clientsList"
                    element={<ClientsList />}
                  />
                  {/* Query Page */}

                  {/* AccessRights Page */}

                  <Route path="/accessRights" element={<AccessRightHomePage />} />
                  <Route path="/chat" element={<Chat />} />

                  <Route />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
