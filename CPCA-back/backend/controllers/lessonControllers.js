const createLesson = async (req, res) => {
  res.send("creating lesson ");
};

const updateLesson = async (req, res) => {
  res.send("updating lesson ");
};

const deleteLesson = async (req, res) => {
  res.send("deleting lesson ");
};

export {createLesson, updateLesson, deleteLesson}