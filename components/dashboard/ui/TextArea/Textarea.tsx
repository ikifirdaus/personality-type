export default function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="block p-2.5 w-full text-gray-500  rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 "
      placeholder="Your message..."
    ></textarea>
  );
}
