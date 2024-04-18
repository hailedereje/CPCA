import React from 'react'

function ActivityCard({text, icon, activity}) {
  return (
    <div className="card border border-base-100 p-3 bg-base-100">
        <figure>
          {icon}
        </figure> 
        <div className="card-body">
          <h2 className="text-2xl text-info">{text}</h2>
          <button className="btn btn-primary mt-4">{activity}</button>
        </div>
      </div>
  )
}

export default ActivityCard
