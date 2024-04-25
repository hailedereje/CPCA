import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateButton from "@/components/CreateButton";
const queryClient = new QueryClient();

export const Layout = () => {

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="relative w-full flex flex-col justify-center items-center 
      overflow-x-hidden bg-white dark:bg-[#32353F]"
      >
        <div
          className="w-full flex flex-col justify-center items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Outlet />
          <div
            className="right-section
          hidden md:block fixed z-10 top-24 right-28"
          >
            <CreateButton />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
