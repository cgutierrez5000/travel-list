import { useState } from 'react';
import Forms from './Forms';
import Logo from './Logo';
import PackingList from './PackingList';
import Stats from './Stats';

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
}
