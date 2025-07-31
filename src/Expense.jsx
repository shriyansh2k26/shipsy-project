import React, { useState, useEffect } from 'react';
import './expense.css'; // Make sure this file exists

// MessageBox Component
const MessageBox = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="message-box-overlay">
      <div className="message-box-content">
        <p className="message-box-text">{message}</p>
        <button onClick={onClose} className="message-box-button">OK</button>
      </div>
    </div>
  );
};

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        const parsed = JSON.parse(storedExpenses);
        parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(parsed);
      }
    } catch (err) {
      console.error("LocalStorage Error:", err);
      setExpenses([]);
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    setDate(todayStr);
    setFilterDate(todayStr);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    applyFilter();
  }, [expenses, filterDate, filterCategory]);

  useEffect(() => {
    const total = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setBalance(total);
  }, [filteredExpenses]);

  const applyFilter = () => {
    let filtered = [...expenses];

    if (filterDate) {
      filtered = filtered.filter((exp) => exp.date === filterDate);
    }

    if (filterCategory) {
      filtered = filtered.filter((exp) => exp.category === filterCategory);
    }

    setFilteredExpenses(filtered);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (
  !description.trim().length ||
  description.trim().length > 20 ||  // <-- new condition
  !amount ||
  !category ||
  !date
) {
  setMessage(
    description.trim().length > 20
      ? 'Description must be less than 20 characters.'
      : 'Please fill in all fields.'
  );
  return;
}


    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Enter a valid positive amount.');
      return;
    }

   const selectedDate = new Date(date);
selectedDate.setHours(0, 0, 0, 0); // Normalize input date
const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize current date

if (selectedDate > today) {
  setMessage('Future date not allowed.');
  return;
}


    const newExpense = {
      id: Date.now(),
      description: description.trim(),
      amount: parsedAmount,
      category,
      date
    };

    setExpenses((prev) => {
      const updated = [...prev, newExpense];
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
      return updated;
    });

    setDescription('');
    setAmount('');
    setMessage('Expense added successfully!');
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(prev => prev.filter(exp => exp.id !== id));
      setMessage('Expense deleted.');
    }
  };

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleAddExpense} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <div className="filter-controls">
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* <button onClick={applyFilter}>Filter</button> */}
        <button
          onClick={() => {
            setFilterDate('');
            setFilterCategory('');
            setFilteredExpenses([]);
          }}
        >
          Clear Filter
        </button>
      </div>

      <div className="balance-display">Total Spent: ₹{balance.toFixed(2)}</div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>₹ Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.description}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>
                <button onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MessageBox message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default Expense;
