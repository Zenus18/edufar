export function ProgressCard({ data }) {
  const { progress_name, report } = data;
  return (
    <div
      className={`md:col-span-1 col-span-2  md:h-40 h-32 rounded-md ${
        progress_name == "pending" ? "bg-[#D7E5EA] text-[#3A606E]" : ""
      } ${progress_name == "on-progress" ? "bg-[#FEFCEC] text-[#C2AC0A]" : ""}
       ${progress_name == "resolved" ? "bg-[#ebfffd] text-[#008F81]" : ""}
      shadow-sm  shadow-gray-500 md:p-8 p-4`}
    >
      <h1 className="font-bold text-6xl w-full text-center mb-2">
        {report.length}
      </h1>
      <p className="font-mono text-xl w-full text-center mt-2">
        {progress_name}
      </p>
    </div>
  );
}
