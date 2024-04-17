type Props = {
  handleChange: (e: any) => void;
  name: string;
  label?: string;
  error?: string;
  options: string[];
};

export default function Select({
  handleChange,
  name,
  label,
  error,
  options,
}: Props) {
  return (
    <div className="">
      <p className="title">{label}</p>
      <div className="w-full mt-2 rounded-md overflow-hidden h-12 border-2">
        <select
          name={name}
          onChange={handleChange}
          className="h-full w-full bg-transparent px-3 outline-none"
        >
          {options.map((data, key) => (
            <option value={key + 1} key={key} className="capitalize">
              {data}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
