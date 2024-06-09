 const  dashboardRoutes = [
    { index: true, element: <Status /> },
    {
      path: "profile",
      element: <Profile />,
    },
    { path: "users", element: <UsersList /> },
  ];


  export {dashboardRoutes as adminRoutes}