import React, { ReactElement, useEffect, useState } from 'react';
import styles from './IconSVG.module.scss';

interface Props {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

function IconSVG({ icon, width, height, color, className }: Props): ReactElement {
  const [isIconAvailable, setIsIconAvailable] = useState(true);
  useEffect(() => {
    const symbol = document.getElementById(icon);
    if (!symbol) {
      setIsIconAvailable(false);
    }
  }, [icon]);

  if (!isIconAvailable) {
    return <span className={styles.fallback_text}>{icon}</span>;
  }

  return (
    <svg width={width} height={height} className={className} style={{ color }}>
      <use href={`#${icon}`} />
    </svg>
  );
}

export default IconSVG;
