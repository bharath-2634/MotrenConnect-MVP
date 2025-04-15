import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@/store/auth-slice";

const initialData = {
  email: "",
  full_name: "",
  gender: "",
  phone: "",
  location: "",
  DOB: "",
  bio: "",
  website: "",
  github: "",
  linkedin: "",
  instagram: "",
  threads: "",
  twitter: "",
  work: "",
  education: "",
  skills: [],
};

const BasicInfo = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("UserEdit", user);

  // Set user data into initialData
  const populatedData = {
    email: user?.email || "",
    full_name: user?.profile?.full_name || "",
    gender: user?.profile?.gender || "",
    phone: user?.profile?.phone || "",
    // avatar_url : user?.profile?.avatar_url,
    location: user?.profile?.location || "",
    DOB: user?.profile?.DOB || "",
    bio: user?.profile?.bio || "",
    website: user?.profile?.links?.website || "",
    github: user?.profile?.links?.github || "",
    linkedin: user?.profile?.links?.linkedin || "",
    instagram: user?.profile?.links?.instagram || "",
    threads: user?.profile?.links?.threads || "",
    twitter: user?.profile?.links?.twitter || "",
    work: user?.profile?.experience?.work || "",
    education: user?.profile?.experience?.education || "",
    skills: user?.profile?.skills || [],
  };

  const [profile, setProfile] = useState(populatedData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();

  const openModal = (key) => {
    setCurrentKey(key);
    setEditValue(profile[key]);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, [currentKey]: editValue }));
    setIsModalOpen(false);
  };

  console.log("UpdatedUser",profile);

  const handleUpdate = () => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profile,
        points : (user.profile?.points || 10) + 50,
        links: {
          ...user.profile?.links,
          website: profile.website,
          github: profile.github,
          linkedin: profile.linkedin,
          instagram: profile.instagram,
          threads: profile.threads,
          twitter: profile.twitter,
        },
        experience: {
          ...user.profile?.experience,
          work: profile.work,
          education: profile.education,
        },
        skills: profile.skills,
      },
    };
    console.log("UpdatingUser",updatedUser);
    dispatch(updateUserProfile(updatedUser));
  };
  

  return (
    <div className="bg-zinc-900 p-6 rounded text-white space-y-4 w-full max-w-5xl shadow-lg font-poppins">
      {Object.entries(profile).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center justify-between gap-4 bg-zinc-800 px-4 py-3 rounded"
        >
          <div className="flex-1 flex items-center gap-6">
            <div className="min-w-[150px] text-sm text-gray-400 font-medium capitalize">
              {key.replace(/_/g, " ")}
            </div>
            <div className="flex-1 text-white text-sm font-normal">
              {key === "DOB"
                ? new Date(value).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : Array.isArray(value)
                ? value.join(", ")
                : value}
            </div>
          </div>
          <button
            onClick={() => openModal(key)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition"
          >
            <Pencil size={16} />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-white">Edit {currentKey.replace(/_/g, " ")}</h2>
            {currentKey === "DOB" ? (
              <input
                type="date"
                value={new Date(editValue).toISOString().split("T")[0]}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : currentKey === "skills" ? (
              <input
                placeholder="Comma separated skills"
                value={editValue.join(", ")}
                onChange={(e) => setEditValue(e.target.value.split(",").map((s) => s.trim()))}
                className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <button className="bg-primary_button py-2 px-9 rounded" onClick={()=>{handleUpdate()}}>
        <h2>Save</h2>
      </button>
    </div>
  );
};

export default BasicInfo;
