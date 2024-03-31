import { NavLink } from 'react-router-dom';



const NavLinks = ({links}) => {

  return (
    <div className='flex flex-col pl-[2.5rem] '>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink  
            to={path}
            className={({isActive})=> `hover:pl-[2rem] hover:bg-base-200 transition-all duration-300 ease-in-out flex items-center py-[1rem]`}
            key={id}
            end
          >
            <span className='mr-[1rem]'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
