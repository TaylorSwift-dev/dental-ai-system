import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, MoreHorizontal } from 'lucide-react';

export interface ActionMenuItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
  badge?: string;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  align?: 'left' | 'right';
  orientation?: 'vertical' | 'horizontal';
  triggerClassName?: string;
  buttonTitle?: string;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  align = 'right',
  orientation = 'horizontal',
  triggerClassName = '',
  buttonTitle = 'More actions'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const IconComponent = orientation === 'vertical' ? MoreVertical : MoreHorizontal;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        title={buttonTitle}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        className={`p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${
          isOpen ? 'bg-slate-100 text-slate-900 ring-1 ring-slate-200' : ''
        } ${triggerClassName}`}
      >
        <IconComponent className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute z-40 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-sky-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <React.Fragment key={index}>
                {item.divider && <div className="my-1 border-t border-slate-100" />}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick();
                  }}
                  className={`w-full px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    item.danger
                      ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                      : 'text-slate-700 hover:bg-sky-50/80 hover:text-sky-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {ItemIcon && (
                      <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${item.danger ? 'text-rose-500' : 'text-slate-400 group-hover:text-sky-600'}`} />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
