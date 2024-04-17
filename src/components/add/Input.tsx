type Props = {
  handleChange: (e: any) => void;
  name: string;
  label?: string;
  error?: string;
};

export default function Input({ handleChange, name, label, error }: Props) {
  return (
    <div className="">
      <p className="title">{label}</p>
      <div className="w-full mt-2 rounded-md overflow-hidden h-12 border-2">
        <input type="text" onChange={handleChange} name={name} className="h-full w-full bg-transparent px-3 outline-none"/>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
