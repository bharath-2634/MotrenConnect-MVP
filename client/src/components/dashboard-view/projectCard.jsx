import React from 'react'
import { useState } from "react";
import { Plus } from "lucide-react";

const ProjectCard = () => {

    const [active, setActive] = useState(false);

  return (
    <div>

<div className="rounded-2xl bg-zinc-800/60 backdrop-blur-md p-6 text-center text-zinc-100 flex flex-col items-center font-poppins">
      <h3 className="text-xl font-medium">Motren Awaits!</h3>
      <p className="text-sm text-indigo-400 mt-1">
        Earn rewards while making a difference
      </p>

      {/* ── toggle pill ───────────────────────────── */}
      <button
        role="switch"
        aria-checked={active}
        onClick={() => setActive(!active)}
        className="relative mt-6 w-80 max-w-full h-14 rounded-full
                   transition-colors duration-300 flex items-center justify-center
                   font-medium text-lg focus:outline-none"
        style={{ backgroundColor: active ? "#4f46e5" : "#27272a" }} /* indigo‑600 vs zinc‑700 */
      >
        {active ? "Project Started" : "Start a Project"}

        {/* sliding knob */}
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2
                      flex items-center justify-center h-9 w-9 rounded-full
                      bg-zinc-100 text-zinc-900
                      transition-transform duration-300
                      ${active ? "translate-x-[260px]" : ""}`}
        >
          <Plus size={20} />
        </span>
      </button>
      {/* ─────────────────────────────────────────── */}

      <p className="text-sm text-indigo-400 mt-4">
        Turn actions into impact!
      </p>
    </div>
      
    </div>
  )
}

export default ProjectCard
