const SimilarLessons = ({ lesson }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Similar Lessons</h3>
      <p className="text-gray-400 text-sm">
        (Fetch by category: {lesson.category} or tone: {lesson.tone})
      </p>
    </div>
  );
};

export default SimilarLessons;
