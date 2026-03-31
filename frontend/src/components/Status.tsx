const status = "😴 Dreamin'";

export default function Status() {

  return (
    <div className="p-4 rounded-2xl shadow-md bg-gray-900 text-white w-fit">
      <p className="text-sm text-gray-400">Current Status</p>
      <p className="text-lg font-semibold mt-1">{status}</p>
    </div>
  );
}