'use client';

import { useState, useEffect } from 'react';

export function OnlineCounter({ base }: { base: number }) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    let current = base;
    const id = setInterval(() => {
      current += Math.floor(Math.random() * 7) - 3;
      if (current < 7000) current = 7000;
      setCount(current);
    }, 3200);
    return () => clearInterval(id);
  }, [base]);

  return <span>{count.toLocaleString('en-US')}</span>;
}
