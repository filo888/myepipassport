import React, { useState, useRef, useEffect } from "react";
import { ASM_DATABASE } from "../data/asmDatabase";

export default function ASMAutocomplete({ value, onChange, placeholder }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef();

  useEffect(() => { setQuery(value || ""); }, [value]);

  const matches = query.length >= 1
    ? ASM_DATABASE.filter(a =>
        a.generic.toLowerCase().includes(query.toLowerCase()) ||
        a.brands.some(b => b.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  function selectItem(asm) {
    setQuery(asm.generic);
    onChange(asm.generic);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      selectItem(matches[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        placeholder={placeholder || "Start typing medication name…"}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
          setHighlighted(-1);
        }}
        onFocus={() => { if (matches.length) setOpen(true); }}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && matches.length > 0 && (
        <div className="autocomplete-list" role="listbox">
          {matches.map((asm, i) => (
            <div
              key={asm.generic}
              className={`autocomplete-item${i === highlighted ? " highlighted" : ""}`}
              onClick={() => selectItem(asm)}
              role="option"
              aria-selected={i === highlighted}
            >
              <strong>{asm.generic}</strong>
              {asm.brands.length > 0 && (
                <span className="brand"> — {asm.brands.join(", ")}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
