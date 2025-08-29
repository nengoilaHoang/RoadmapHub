import { useState } from 'react'
import { Route,Routes,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import HomeLayout from '#layouts/HomeLayout.jsx'
import NavbarLayout from '#layouts/NavbarLayout.jsx'
import RoadmapLayout from '#layouts/RoadmapLayout.jsx'
import SignUp from '#pages/SignUp/SignUp.jsx'
import VerifyEmail from '#pages/SignUp/VerifyEmail.jsx'
import Login from '#pages/Login/loginPage/Login.jsx'
import LoginVerify from '#pages/Login/LoginVerify/LoginVerify.jsx'
import ForgotPassword from '#pages/ForgotPassword/ForgotPassword/forgotPassword.jsx'
import ResetPassword from './pages/ForgotPassword/ResetPassword/ResetPassword'
import RefreshToken from '#pages/Login/RefreshTokenPage/RefreshToken.jsx'
import RoadmapEditPage from '#pages/Roadmap/RoadmapEditPage/RoadmapEditPage.jsx'
import PrivacyPolicy from '#pages/TermsServiceAndPrivacyPolicy/PrivacyPolicy/PrivacyPolicy.jsx'
import TermsService from '#pages/TermsServiceAndPrivacyPolicy/TermsService/TermsService.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage'
import RoadmapView from '#pages/Roadmap/RoadmapView/RoadmapView.jsx'
import Home from '#pages/Home/Home.jsx'
import ChangeEmailVerify from '#pages/ChangeEmailVerify/ChangeEmailVerify.jsx'
function App() {
  const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<HomeLayout />,
      children:[
        {index:true,element:<Home />},
        {path:'about',element:<h1>About Page</h1>}
      ]
    },
    {
      path:'/',
      element:<NavbarLayout/>,
      children:[
        {path:'signup',element:<SignUp/>},
        {path:'verify/:email',element:<VerifyEmail/>},
        {path:'login',element:<Login/>},
        {path:'login/verify',element:<LoginVerify/>},
        {path:'forgot-password',element:<ForgotPassword/>},
        {path:'reset-password/:token/:email', element: <ResetPassword />},
        {path:'refresh-token', element: <RefreshToken />},
        {path:'privacy-policy', element: <PrivacyPolicy />},
        {path:'terms-of-service', element: <TermsService />},
        {path:'profile', element: <ProfilePage />},
        {path:'roadmap/view', element:<RoadmapView />},
        {path:'change-email/verify/:hashedPin/:oldEmail/:newEmail', element:<ChangeEmailVerify />}
      ]
    },
    {
      path:'/',
      element:<RoadmapLayout/>,
      children:[
        {path:'roadmap/edit/:name', element: <RoadmapEditPage />},
        
      ]

    }
  ]
  //   createRoutesFromElements(
  //       <Route path='/' element={<HomeLayout />}>
  //         <Route index element={<h1>Home Page Tham dự có các đồng chí nguyên Ủy viên Bộ Chính trị: nguyên Thủ tướng Chính phủ Nguyễn Tấn Dũng, nguyên Thường trực Ban Bí thư Lê Hồng Anh; các đồng chí Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng: Trưởng ban Tổ chức Trung ương Lê Minh Hưng, Trưởng ban Nội Chính Trung ương Phan Đình Trạc, Chủ nhiệm Ủy ban Kiểm tra Trung ương Nguyễn Duy Ngọc, Trưởng ban Tuyên giáo và Dân vận Trung ương Nguyễn Trọng Nghĩa, Chủ tịch Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam Đỗ Văn Chiến; các đồng chí Ủy viên Bộ Chính trị: Phó Thủ tướng Thường trực Chính phủ Nguyễn Hòa Bình, Bộ trưởng Bộ Công an Đại tướng Lương Tam Quang, Bí thư Thành ủy Thành phố Hồ Chí Minh Nguyễn Văn Nên.

  // Các đồng chí Bí thư Trung ương Đảng: Chánh Văn phòng Trung ương Đảng Lê Hoài Trung, Chánh án Tòa án nhân dân tối cao Lê Minh Trí, Chủ nhiệm Tổng cục Chính trị Quân đội nhân dân Việt Nam Đại tướng Trịnh Văn Quyết; các đồng chí Ủy viên Trung ương Đảng: Phó Chủ tịch nước Võ Thị Ánh Xuân, Phó Chủ tịch Quốc hội Nguyễn Đức Hải, lãnh đạo các ban, bộ, ngành, cơ quan Trung ương, địa phương, lãnh đạo, nguyên lãnh đạo Bộ Công an, các đơn vị trực thuộc Bộ Công an cùng tham dự.

  // Nhân dịp này, Bộ Công an đã tổ chức Lễ truy tặng danh hiệu “Anh hùng Lực lượng vũ trang nhân dân” cho Thượng tướng Lê Minh Hương, Ủy viên Bộ Chính trị, cố Bộ trưởng Bộ Công an. Thay mặt lãnh đạo Đảng, Nhà nước, Tổng Bí thư Tô Lâm đã trao danh hiệu “Anh hùng Lực lượng vũ trang nhân dân” cho đại diện gia đình cố Bộ trưởng Bộ Công an Lê Minh Hương.

  // Tại buổi gặp mặt, đại biểu cán bộ Công an nghỉ hưu đã phát biểu chân thành, tâm huyết; bày tỏ tin tưởng hơn vào sự nghiệp Cách mạng của Đảng, của nhân dân, hy vọng về tương lai tươi sáng của đất nước.</h1>} />,
  //         <Route path="about" element={<h1>About Page</h1>} />,
  //         <Route path="contact" element={<h1>Contact Page</h1>} />,
  //         <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
  //         <Route path='*' element={<p>Not Found</p>}/>
  //       </Route>,
  //   ),
  
   
    // createRoutesFromElements(
    //   <Route element={<NavbarLayout/>}>
    //       <Route path='signup' element={<SignUp/>}/>
    //   </Route>
    // )
  
)
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
