import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";

const AddLesson = () => {
  const { isPremium, role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // role = "admin" | "premium" | "free"
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const { title, description, category, tone, privacy, access } = data;
    const lessonData = {
      authorEmail: user?.email,
      authorName : user?.displayName,
      title,
      description,
      category,
      tone,
      privacy,
      access,
    };
    axiosSecure.post("/lessons", lessonData).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          title: "Lesson Created!",
          text: "Your lesson has been successfully added.",
          icon: "success",
          confirmButtonColor: "#facc15",
        });
      }
    });
    reset();
  };

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-20 mb-10 p-8 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl"
    >
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
        Create New Lesson
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Lesson Title */}
        <div>
          <label className="text-white font-semibold">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="e.g. The day I learned patience..."
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-yellow-400"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label className="text-white font-semibold">Full Description</label>
          <textarea
            {...register("description", {
              required: "Description cannot be empty",
            })}
            rows={6}
            placeholder="Write your full story or insight..."
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-yellow-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-white font-semibold">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white focus:outline-yellow-400"
          >
            <option value="" disabled className="text-gray-700">
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-gray-900">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="text-white font-semibold">Emotional Tone</label>
          <select
            {...register("tone", { required: true })}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white focus:outline-yellow-400"
          >
            <option value="" disabled>
              Select Tone
            </option>
            {tones.map((tone) => (
              <option key={tone} value={tone} className="text-gray-900">
                {tone}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-white font-semibold">Image (Optional)</label>
          <input
            type="file"
            {...register("image")}
            className="w-full mt-1 text-white file:bg-yellow-400 file:text-black file:px-4 file:py-2 file:rounded-xl file:mr-3"
          />
        </div>

        {/* Privacy */}
        <div>
          <label className="text-white font-semibold">Privacy</label>
          <select
            {...register("privacy")}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white focus:outline-yellow-400"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div className="relative">
          <label className="text-white font-semibold">Access Level</label>
          <select
            {...register("access")}
            disabled={!isPremium}
            className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/20 
      text-white focus:outline-yellow-400
      ${!isPremium && "opacity-50 cursor-not-allowed"}
    `}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>

          {/* Tooltip */}
          {!isPremium && (
            <p className="absolute right-0 -bottom-5 text-xs text-yellow-300">
              Upgrade to Premium to unlock paid lessons
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition"
        >
          Create Lesson
        </button>
      </form>
    </motion.div>
  );
};

export default AddLesson;
