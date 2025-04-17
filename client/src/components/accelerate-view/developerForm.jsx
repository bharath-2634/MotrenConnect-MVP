import React, { useState } from 'react';


const DOMAIN_OPTIONS = ["Frontend", "Backend", "Full Stack", "Mobile App", "DevOps", "Cloud"];
const TECH_STACK_OPTIONS = [
  "React.js", "Next.js", "TypeScript", "JavaScript", "Angular", "Python", "PHP", "Java",
  "MERN", "MEAN", "React Native", "Flutter", "Kotlin", "Google Cloud"
];

const DeveloperForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [repo1, setRepo1] = useState('');
  const [repo2, setRepo2] = useState('');

  const handleToggle = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      domains: selectedDomains,
      techStack: selectedTechStack,
      repo1,
      repo2
    };
    console.log("Form Data:", formData);
    onSubmit?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500">&times;</button>
        <h2 className="text-xl font-semibold mb-4 text-center">Developer Info Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Domains */}
          <div>
            <label className="font-medium">Domains (multiple)</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {DOMAIN_OPTIONS.map((domain) => (
                <button
                  type="button"
                  key={domain}
                  onClick={() => handleToggle(domain, selectedDomains, setSelectedDomains)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedDomains.includes(domain)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="font-medium">Tech Stack (multiple)</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => handleToggle(tech, selectedTechStack, setSelectedTechStack)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedTechStack.includes(tech)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* GitHub Links */}
          <div className="flex flex-col gap-2">
            <input
              type="url"
              placeholder="GitHub Repo Link 1"
              className="border px-4 py-2 rounded-md"
              value={repo1}
              onChange={(e) => setRepo1(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="GitHub Repo Link 2"
              className="border px-4 py-2 rounded-md"
              value={repo2}
              onChange={(e) => setRepo2(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeveloperForm;
