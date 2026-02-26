import React, { useState } from 'react';

interface CreateUserFormProps {
  onSave: (user: {
    email: string;
    password: string;
    name: string;
    role: string;
    department: string;
  }) => void;
  onCancel: () => void;
  department?: string;
  defaultRole?: string;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSave,
  onCancel,
  department = 'Accounts',
  defaultRole = 'Staff',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(defaultRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ email, password, name, role, department });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Create User (Accounts)</h2>
      <div>
        <label className="block mb-1 font-medium">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password *</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Role *</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="Staff">Staff</option>
          <option value="HOD">HOD</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default CreateUserForm;
