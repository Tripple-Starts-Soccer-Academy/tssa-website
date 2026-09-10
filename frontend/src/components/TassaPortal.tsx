import React, { useState, useEffect } from 'react';
import { Lock, X, UserPlus, Settings, FileText, DollarSign, Phone, Upload, Download, Trash2, Ticket } from 'lucide-react';

const CORRECT_PIN = '02141';
const API_URL = 'http://localhost:5001';

type TabKey = 'registration' | 'admin' | 'documents' | 'expenditure' | 'tickets' | 'emergency';

const PlayerRegistration = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <UserPlus className="w-5 h-5 mr-2 text-blue-600" /> Player Registration
    </h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
      <input className="border border-gray-300 rounded-lg p-2" placeholder="Full Name" />
      <input className="border border-gray-300 rounded-lg p-2" placeholder="Date of Birth" type="date" />
      <select className="border border-gray-300 rounded-lg p-2">
        <option>Boy</option>
        <option>Girl</option>
      </select>
      <select className="border border-gray-300 rounded-lg p-2">
        <option>U-16</option>
        <option>U-17</option>
        <option>Senior</option>
      </select>
      <input className="border border-gray-300 rounded-lg p-2 md:col-span-2" placeholder="Parent / Guardian Contact" />
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors md:col-span-2">
        Register Player
      </button>
    </form>
  </div>
);

const AdminPortal = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <Settings className="w-5 h-5 mr-2 text-blue-600" /> Admin Portal
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">45</div>
        <div className="text-sm text-gray-600">Registered Players</div>
      </div>
      <div className="bg-green-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-green-600">7</div>
        <div className="text-sm text-gray-600">Active Programs</div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-yellow-600">3</div>
        <div className="text-sm text-gray-600">Upcoming Fixtures</div>
      </div>
    </div>
  </div>
);

interface UploadedDoc {
  filename: string;
  size: number;
  url: string;
  createdAt?: string;
}

const Documents = () => {
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchDocs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/upload/type/documents`);
      const json = await res.json();
      if (json.success) setDocs(json.data);
    } catch {
      setMessage('Could not load documents. Is the backend running?');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'documents');

    try {
      const res = await fetch(`${API_URL}/api/upload/single`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setMessage(`Uploaded: ${file.name}`);
        fetchDocs();
      } else {
        setMessage(json.message || 'Upload failed');
      }
    } catch {
      setMessage('Upload failed. Is the backend running?');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const res = await fetch(`${API_URL}/api/upload/${filename}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDocs(docs.filter((d) => d.filename !== filename));
      }
    } catch {
      setMessage('Delete failed.');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-blue-600" /> Documents
      </h3>

      <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
        <Upload className="w-6 h-6 text-blue-600 mr-2" />
        <span className="text-gray-700 font-medium">
          {uploading ? 'Uploading...' : 'Upload a document from your drive'}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </label>

      {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}

      {docs.length === 0 ? (
        <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc.filename} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
              <div>
                <span className="text-gray-700 font-medium">{doc.filename}</span>
                <span className="text-gray-400 text-xs ml-2">{formatSize(doc.size)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={`${API_URL}${doc.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" /> View
                </a>
                <button
                  onClick={() => handleDelete(doc.filename)}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface ExpenseItem {
  item: string;
  quantity: number;
  receipts: string;
  approvals: string;
  survey: string;
  amount: number;
  date: string;
}

const Expenditure = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newReceipts, setNewReceipts] = useState('');
  const [newApprovals, setNewApprovals] = useState('');
  const [newSurvey, setNewSurvey] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const saveExpense = () => {
    const amount = parseFloat(newAmount.replace(/,/g, ''));
    const quantity = parseInt(newQuantity, 10);
    if (!newItem.trim() || isNaN(amount) || amount <= 0) return;
    setExpenses([
      ...expenses,
      {
        item: newItem.trim(),
        quantity: isNaN(quantity) ? 1 : quantity,
        receipts: newReceipts.trim(),
        approvals: newApprovals.trim(),
        survey: newSurvey.trim(),
        amount,
        date: newDate,
      },
    ]);
    setNewItem('');
    setNewQuantity('');
    setNewReceipts('');
    setNewApprovals('');
    setNewSurvey('');
    setNewAmount('');
    setNewDate(new Date().toISOString().slice(0, 10));
  };

  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-blue-600" /> Expenditure
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Quantity"
          inputMode="numeric"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Amount (UGX)"
          inputMode="numeric"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Receipts"
          value={newReceipts}
          onChange={(e) => setNewReceipts(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Approvals"
          value={newApprovals}
          onChange={(e) => setNewApprovals(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Survey"
          value={newSurvey}
          onChange={(e) => setNewSurvey(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg p-2"
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button
          onClick={saveExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold md:col-span-2"
        >
          Save
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Receipts</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Approvals</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Survey</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount (UGX)</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-sm text-gray-500 text-center">
                  No expenses recorded yet.
                </td>
              </tr>
            )}
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm">{expense.item}</td>
                <td className="px-4 py-2 text-sm">{expense.quantity}</td>
                <td className="px-4 py-2 text-sm">{expense.receipts || '-'}</td>
                <td className="px-4 py-2 text-sm">{expense.approvals || '-'}</td>
                <td className="px-4 py-2 text-sm">{expense.survey || '-'}</td>
                <td className="px-4 py-2 text-sm">{expense.amount.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">{expense.date}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => removeExpense(index)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-bold">
              <td className="px-4 py-3 text-sm text-gray-900" colSpan={5}>Total</td>
              <td className="px-4 py-3 text-sm text-blue-700">{total.toLocaleString()} UGX</td>
              <td className="px-4 py-3" colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

interface TicketItem {
  title: string;
  category: string;
  description: string;
  reportedBy: string;
  priority: string;
  date: string;
  status: 'Open' | 'Resolved';
}

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pitch Issue');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [priority, setPriority] = useState('Medium');

  const submitTicket = () => {
    if (!title.trim() || !description.trim()) return;
    setTickets([
      ...tickets,
      {
        title: title.trim(),
        category,
        description: description.trim(),
        reportedBy: reportedBy.trim() || 'Anonymous',
        priority,
        date: new Date().toISOString().slice(0, 10),
        status: 'Open',
      },
    ]);
    setTitle('');
    setCategory('Pitch Issue');
    setDescription('');
    setReportedBy('');
    setPriority('Medium');
  };

  const resolveTicket = (index: number) => {
    setTickets(tickets.map((t, i) => (i === index ? { ...t, status: 'Resolved' } : t)));
  };

  const removeTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Ticket className="w-5 h-5 mr-2 text-blue-600" /> Tickets Submission
      </h3>
      <p className="text-gray-600 text-sm mb-4">Report any issues faced on the pitch so the team can handle them.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Pitch Issue</option>
          <option>Equipment</option>
          <option>Player Welfare</option>
          <option>Match Incident</option>
          <option>Facility</option>
          <option>Other</option>
        </select>
        <input
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Reported by"
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <textarea
          className="border border-gray-300 rounded-lg p-2 md:col-span-2"
          placeholder="Describe the issue..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={submitTicket}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold md:col-span-2"
        >
          Submit Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-sm">No tickets submitted yet.</p>
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket, index) => (
            <li key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900">{ticket.title}</span>
                  <span className="text-gray-400 text-xs ml-2">{ticket.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By {ticket.reportedBy} on {ticket.date}</span>
                <div className="space-x-3">
                  {ticket.status === 'Open' && (
                    <button onClick={() => resolveTicket(index)} className="text-green-600 hover:text-green-800 font-medium">
                      Mark Resolved
                    </button>
                  )}
                  <button onClick={() => removeTicket(index)} className="text-red-600 hover:text-red-800 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EmergencyCall = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <Phone className="w-5 h-5 mr-2 text-red-600" /> Emergency Call
    </h3>
    <p className="text-gray-600 mb-4">Use these contacts in case of an emergency involving academy players or staff.</p>
    <div className="space-y-3">
      <a href="tel:+256700000000" className="block bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors">
        <div className="font-semibold text-red-700">Academy President - Mr. Ntambi Rogers Tabula</div>
        <div className="text-sm text-gray-600">+256 700 000 000</div>
      </a>
      <a href="tel:+256700000001" className="block bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors">
        <div className="font-semibold text-red-700">Head Coach</div>
        <div className="text-sm text-gray-600">+256 700 000 001</div>
      </a>
      <a href="tel:999" className="block bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors">
        <div className="font-semibold text-red-700">Uganda Police Emergency</div>
        <div className="text-sm text-gray-600">999</div>
      </a>
    </div>
  </div>
);

const tabs: Array<{ key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'registration', label: 'Player Registration', icon: UserPlus },
  { key: 'admin', label: 'Admin Portal', icon: Settings },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'expenditure', label: 'Expenditure', icon: DollarSign },
  { key: 'tickets', label: 'Tickets', icon: Ticket },
  { key: 'emergency', label: 'Emergency Call', icon: Phone },
];

interface TassaPortalProps {
  open: boolean;
  onClose: () => void;
}

const TassaPortal = ({ open, onClose }: TassaPortalProps) => {
  const [pin, setPin] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('registration');

  if (!open) return null;

  const handleVerify = () => {
    if (pin === CORRECT_PIN) {
      setVerified(true);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setVerified(false);
    setError('');
    setActiveTab('registration');
    onClose();
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'registration': return <PlayerRegistration />;
      case 'admin': return <AdminPortal />;
      case 'documents': return <Documents />;
      case 'expenditure': return <Expenditure />;
      case 'tickets': return <Tickets />;
      case 'emergency': return <EmergencyCall />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
          <h2 className="text-xl font-bold">TASSA Portal</h2>
          <button onClick={handleClose} className="p-1 rounded hover:bg-gray-700 transition-colors" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!verified ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <Lock className="w-16 h-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enter PIN</h3>
            <p className="text-gray-500 text-sm mb-6">Restricted area - authorized staff only</p>
            <input
              type="password"
              inputMode="numeric"
              maxLength={5}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-[0.5em] w-48 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="•••••"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              onClick={handleVerify}
              className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Unlock
            </button>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <nav className="w-56 bg-white border-r border-gray-200 p-4 space-y-2 flex-shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            <div className="flex-1 overflow-y-auto p-6">
              {renderTab()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TassaPortal;
