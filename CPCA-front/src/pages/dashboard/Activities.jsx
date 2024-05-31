import React from "react";

import { ActivityCard } from "../../components/";
import { instructorActivities } from "../../utils/links";
import { Link } from "react-router-dom";

function Activities() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 ">
      {instructorActivities.map((activity) => (
        <Link to = {activity.path} key={activity.id}>
          <ActivityCard
            text={activity.text}
            activity={activity.activity}
            icon={activity.icon}
          />
        </Link>
      ))}
    </div>
  );
}

export default Activities;
