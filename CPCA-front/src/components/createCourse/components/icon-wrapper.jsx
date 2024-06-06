export const IconWrapper = ({bg,color,icon}) => {
    return (
        <div className={`xxs:hidden  w-14 h-14 p-4 md:flex  justify-center items-center rounded-full ${bg} ${color}`}>
            <span className="text-2xl">
                {icon} 
            </span>
        </div>
    )
}