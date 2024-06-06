import { Link } from "react-router-dom";

export const Breadcrumb = ({ items }) => {
    return (
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <Link to={`/${item.link}`} className="text-gray-500 dark:text-gray-200">{item.title}</Link>
                {index < items.length - 1 && (
                  <svg
                    className="flex-shrink-0 w-5 h-5 mx-2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  };
  