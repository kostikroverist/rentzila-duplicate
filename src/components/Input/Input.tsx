import { FC } from "react"


type Props = {
    label: string,
    name: string,
    type: string,
    value: string | number
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: React.ReactNode;
}

const Input: FC<Props> = ({ name, type, label, placeholder, onChange, value, error }) => {
    return (
        <div className="p-3 flex flex-col">
            <label className="block text-lg font-semibold text-gray-600">{label}</label>
            <input
                value={value}
                type={type}
                name={name}
                placeholder={placeholder}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                onChange={onChange}
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    )
}

export default Input
