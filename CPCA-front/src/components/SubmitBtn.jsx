import React from "react";
import { useNavigation } from "react-router-dom";
function SubmitBtn({ text }) {
  const navigation = useNavigation();
  const isSubmitting = false;

  return (
    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
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
