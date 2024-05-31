import React from "react";
import { useNavigation } from "react-router-dom";
function SubmitBtn({ text }) {
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <button type="submit" disabled={isSubmitting} className="btn  bg-green-2">
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
}

export default SubmitBtn;
