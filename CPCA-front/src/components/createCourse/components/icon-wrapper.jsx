export const IconWrapper = ({bg,color,icon,size= 14}) => {
    return (
        <div className={`w-${size} h-${size} p-4 flex  justify-center items-center rounded-full bg-blue-200 ${color}`}>
            <span className="text-2xl text-black">
                {icon} 
            </span>
        </div>
    )
}