type Props = {
  handleChange: (e: any) => void;
  name: string;
  label?: string;
  error?: string;
  height?: string;
};

export default function TextArea({
  handleChange,
  name,
  label,
  error,
  height,
}: Props) {
  return (
    <div className="">
      <p className="title">{label}</p>
      <div
        className="w-full mt-2 rounded-md overflow-hidden border-2"
        style={{ height: `${height}` }}
      >
        <textarea
          onChange={handleChange}
          name={name}
          className="h-full p-3 w-full bg-transparent outline-none"
        ></textarea>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
