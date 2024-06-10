export const IconWrapper = ({bg,color,icon,size= 14}) => {
    return (
        <div className={`w-${size} h-${size} p-4 flex  justify-center items-center rounded-full ${bg} ${color}`}>
            <span className="text-2xl">
                {icon} 
            </span>
        </div>
    )
}