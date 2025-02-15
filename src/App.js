import { useState } from 'react';
import Forms from './Forms';
import Logo from './Logo';


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log('delete', id);
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log('toggle', id);
    setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  function handleClearItems() {
    const confirmed = window.confirm('Are you sure you want to delete all items?');

    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Forms onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearItems} />
      <Stats items={items} />
    </div>
  );

  function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
    const [sortBy, setSortBy] = useState('input');

    let sortedItems;

    if (sortBy === 'input') sortedItems = items;

    if (sortBy === 'description')
      sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed')
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));


    return (
      <div className='list'>
        <ul>
          {sortedItems.map((item) => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
          ))}
        </ul>
        <div className='actions'>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value='input'>Sort by input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear list</button>
        </div>
      </div>
    );
  }

  function Item({ item, onDeleteItem, onToggleItem }) {
    return (
      <li>
        <input type='checkbox' checked={item.packed} onChange={() => onToggleItem(item.id)} />
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    );
  }

  function Stats({ items }) {
    if (!items.length)
      return (
        <footer className='stats'>
          <em>🚀 Start adding some items to your packing list 🚀</em>
        </footer>
      );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = numItems ? Math.round((numPacked / numItems) * 100) : 0;
    return (
      <footer className='stats'>
        <em>
          {percentage === 100 ? 'You got everything! Ready to go ✈️' :
            `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}</em>
      </footer>
    );
  }
}
