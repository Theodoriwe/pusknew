import { useState, useRef, useEffect } from "react";
import { m } from "framer-motion";

interface TextInputProps {
  label: string;
  description?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function TextInput({
  label,
  description,
  placeholder,
  value,
  onChange,
  required,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-2">
        <span className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <m.input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{
          borderColor: isFocused ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
          boxShadow: isFocused ? "0 0 0 3px rgba(84, 154, 242, 0.1)" : "0 0 0 0px rgba(84, 154, 242, 0)",
        }}
        transition={{ duration: 0.2 }}
        className="w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/50"
        style={{
          borderColor: isFocused ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
        }}
      />
    </m.div>
  );
}

interface TextAreaProps {
  label: string;
  description?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}

export function TextArea({
  label,
  description,
  placeholder,
  value,
  onChange,
  rows = 4,
  required,
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-2">
        <span className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <m.textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground focus:outline-none transition-all resize-none placeholder:text-muted-foreground/50"
        style={{
          borderColor: isFocused ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
        }}
      />
    </m.div>
  );
}

interface CheckboxGroupProps {
  label: string;
  description?: string;
  options: { id: string; label: string; subtext?: string; requiresInput?: boolean }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  customInputs?: Record<string, string>;
  onCustomInputChange?: (id: string, value: string) => void;
  required?: boolean;
  columns?: 1 | 2 | 3;
}

export function CheckboxGroup({
  label,
  description,
  options,
  selected,
  onChange,
  customInputs = {},
  onCustomInputChange,
  required,
  columns = 1,
}: CheckboxGroupProps) {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-4">
        <span className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <div className={`grid ${gridClass} gap-3`}>
        {options.map((option, index) => (
          <m.div key={option.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
            <m.button
              type="button"
              onClick={() => handleToggle(option.id)}
              className="flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left group w-full hover:shadow-md"
              style={{
                borderColor: selected.includes(option.id) ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
                backgroundColor: selected.includes(option.id) ? "rgba(84, 154, 242, 0.08)" : "transparent",
              }}
              whileHover={{
                borderColor: selected.includes(option.id) ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.4)",
              }}
            >
              <m.div
                className="flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all"
                style={{
                  borderColor: selected.includes(option.id) ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.4)",
                  backgroundColor: selected.includes(option.id) ? "rgb(84, 154, 242)" : "transparent",
                }}
              >
                {selected.includes(option.id) && (
                  <m.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </m.svg>
                )}
              </m.div>

              <div className="flex-1">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {option.label}
                </span>
                {option.subtext && <p className="text-xs text-muted-foreground mt-1">{option.subtext}</p>}
              </div>
            </m.button>

            {/* Custom input field for "Other" options */}
            {selected.includes(option.id) && option.requiresInput && onCustomInputChange && (
              <m.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <textarea
                  placeholder="Напишите подробнее..."
                  value={customInputs[option.id] || ""}
                  onChange={(e) => onCustomInputChange(option.id, e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary/40 bg-primary/5 text-foreground text-sm focus:outline-none focus:border-primary focus:bg-background transition-all placeholder:text-muted-foreground/50 resize-none"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </m.div>
            )}
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

interface RadioGroupProps {
  label: string;
  description?: string;
  options: { id: string; label: string; subtext?: string; requiresInput?: boolean }[];
  selected: string | null;
  onChange: (selected: string) => void;
  customInputs?: Record<string, string>;
  onCustomInputChange?: (id: string, value: string) => void;
  required?: boolean;
  columns?: 1 | 2 | 3;
}

export function RadioGroup({
  label,
  description,
  options,
  selected,
  onChange,
  customInputs = {},
  onCustomInputChange,
  required,
  columns = 1,
}: RadioGroupProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-4">
        <span className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <div className={`grid ${gridClass} gap-3`}>
        {options.map((option, index) => (
          <m.div key={option.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
            <m.button
              type="button"
              onClick={() => onChange(option.id)}
              className="flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left group w-full hover:shadow-md"
              style={{
                borderColor: selected === option.id ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
                backgroundColor: selected === option.id ? "rgba(84, 154, 242, 0.08)" : "transparent",
              }}
              whileHover={{
                borderColor: selected === option.id ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.4)",
              }}
            >
              <m.div
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all"
                style={{
                  borderColor: selected === option.id ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.4)",
                }}
              >
                {selected === option.id && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                )}
              </m.div>

              <div className="flex-1">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {option.label}
                </span>
                {option.subtext && <p className="text-xs text-muted-foreground mt-1">{option.subtext}</p>}
              </div>
            </m.button>

            {/* Custom input field for "Other" options */}
            {selected === option.id && option.requiresInput && onCustomInputChange && (
              <m.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-9"
              >
                <input
                  type="text"
                  placeholder="Напишите подробнее..."
                  value={customInputs[option.id] || ""}
                  onChange={(e) => onCustomInputChange(option.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary/40 bg-primary/5 text-foreground text-sm focus:outline-none focus:border-primary focus:bg-background transition-all placeholder:text-muted-foreground/50"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </m.div>
            )}
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

interface ColorPickerProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
}

export function ColorPicker({
  label,
  description,
  value,
  onChange,
  presets = ["#FFFFFF", "#000000", "#3B82F6", "#22C55E", "#808080", "#EF4444"],
}: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [localValue, setLocalValue] = useState(value || "#549AF2");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPicker]);

  const handleColorChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-3">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <div className="relative" ref={pickerRef}>
        <m.button
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-3 p-3 rounded-lg border-2 transition-all w-full"
          style={{
            borderColor: "rgba(84, 154, 242, 0.2)",
          }}
          whileHover={{
            borderColor: "rgba(84, 154, 242, 0.4)",
          }}
        >
          <m.div
            className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-lg"
            style={{ backgroundColor: localValue }}
            layoutId="color-preview"
          />
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-foreground">{localValue.toUpperCase()}</div>
            <div className="text-xs text-muted-foreground">Нажмите для изменения</div>
          </div>
          <svg
            className={`w-5 h-5 text-muted-foreground transition-transform ${showPicker ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </m.button>

        {/* Color Picker Dropdown */}
        {showPicker && (
          <m.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 p-4 rounded-lg border-2 border-primary/20 bg-card shadow-xl"
          >
            {/* Color Input */}
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Введите цвет (HEX)</label>
              <input
                type="text"
                value={localValue}
                onChange={(e) => {
                  if (e.target.value.startsWith("#")) {
                    handleColorChange(e.target.value);
                  }
                }}
                placeholder="#000000"
                maxLength={7}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 bg-background text-foreground text-sm focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Preset Colors */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Популярные цвета</label>
              <div className="grid grid-cols-6 gap-2">
                {presets.map((preset) => (
                  <m.button
                    key={preset}
                    onClick={() => handleColorChange(preset)}
                    className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: preset,
                      borderColor: preset === localValue ? "#549AF2" : "transparent",
                      borderWidth: preset === localValue ? "3px" : "2px",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {preset === localValue && (
                      <m.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-white mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </m.svg>
                    )}
                  </m.button>
                ))}
              </div>
            </div>

            {/* Native Color Picker */}
            <div className="mt-4 pt-4 border-t border-primary/20">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Выбрать из палитры</label>
              <input
                type="color"
                value={localValue}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </m.div>
        )}
      </div>
    </m.div>
  );
}

// Helper function to convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

interface MultiColorPickerProps {
  label: string;
  description?: string;
  values: string[];
  onChange: (values: string[]) => void;
  maxColors?: number;
  presets?: string[];
}

export function MultiColorPicker({
  label,
  description,
  values,
  onChange,
  maxColors = 7,
  presets = ["#FCD34D", "#000000", "#3B82F6", "#22C55E", "#808080", "#EF4444"],
}: MultiColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [localValue, setLocalValue] = useState("#549AF2");
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleSetEditingColor = (color: string) => {
    setLocalValue(color);
    setEditingColor(color);
  };

  const handleSetShowPicker = (show: boolean) => {
    setShowPicker(show);
    if (show) {
      setLocalValue("#549AF2");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
        setEditingColor(null);
      }
    };

    if (showPicker || editingColor) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPicker, editingColor]);

  const handleAddColor = (color: string) => {
    if (values.length < maxColors && !values.includes(color)) {
      onChange([...values, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    onChange(values.filter((c) => c !== color));
  };

  const handleUpdateColor = (oldColor: string, newColor: string) => {
    if (values.includes(newColor) && oldColor !== newColor) {
      return;
    }
    const newValues = values.map((c) => (c === oldColor ? newColor : c));
    onChange(newValues);
    setEditingColor(null);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block mb-3">
        <span className="text-sm font-semibold text-foreground">
          {label}
          <span className="text-xs text-muted-foreground ml-2">
            ({values.length}/{maxColors})
          </span>
        </span>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </label>

      <div className="space-y-4">
        {/* Selected Colors */}
        <div className="flex flex-wrap gap-2">
          {values.map((color) => (
            <m.div
              key={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative group"
            >
              <m.button
                type="button"
                onClick={() => handleSetEditingColor(color)}
                className="w-12 h-12 rounded-lg border-2 border-primary/40 shadow-md cursor-pointer hover:border-primary transition-all hover:scale-110"
                style={{ backgroundColor: color }}
                title={color}
                whileHover={{ scale: 1.1 }}
              />
              <m.button
                onClick={() => handleRemoveColor(color)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                ×
              </m.button>
            </m.div>
          ))}

          {/* Add Color Button */}
          {values.length < maxColors && (
            <m.button
              onClick={() => handleSetShowPicker(!showPicker)}
              className="w-12 h-12 rounded-lg border-2 border-dashed border-primary/40 flex items-center justify-center text-primary hover:border-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold">+</span>
            </m.button>
          )}
        </div>

        {/* Color Editor for existing color */}
        {editingColor && (
          <m.div
            ref={pickerRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg border-2 border-primary/20 bg-card shadow-lg overflow-hidden"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Редактировать цвет</h3>
            
            {/* Color Input */}
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Введите цвет (HEX)</label>
              <input
                type="text"
                value={localValue}
                onChange={(e) => {
                  if (e.target.value.startsWith("#") || e.target.value === "") {
                    setLocalValue(e.target.value);
                  }
                }}
                placeholder="#000000"
                maxLength={7}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 bg-background text-foreground text-sm focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Native Color Picker */}
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Выбрать из палитры</label>
              <input
                type="color"
                value={localValue.startsWith("#") ? localValue : "#000000"}
                onChange={(e) => setLocalValue(e.target.value)}
                className="w-full h-16 rounded-lg cursor-pointer border-2 border-primary/20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <m.button
                onClick={() => {
                  if (localValue.startsWith("#")) {
                    handleUpdateColor(editingColor, localValue);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:shadow-lg active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Сохранить
              </m.button>
              <m.button
                onClick={() => setEditingColor(null)}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-border text-foreground font-semibold transition-all hover:border-primary active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Отмена
              </m.button>
            </div>
          </m.div>
        )}

        {/* Color Picker */}
        {showPicker && (
          <m.div
            ref={pickerRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg border-2 border-primary/20 bg-card shadow-lg overflow-hidden"
          >
            {/* Color Input */}
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Введите цвет (HEX)</label>
              <input
                type="text"
                value={localValue}
                onChange={(e) => {
                  if (e.target.value.startsWith("#") || e.target.value === "") {
                    setLocalValue(e.target.value);
                  }
                }}
                placeholder="#000000"
                maxLength={7}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 bg-background text-foreground text-sm focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Preset Colors */}
            <div className="mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Популярные цвета</label>
              <div className="grid grid-cols-6 gap-2">
                {presets.map((preset) => (
                  <m.button
                    key={preset}
                    onClick={() => {
                      handleAddColor(preset);
                      handleSetShowPicker(false);
                    }}
                    disabled={values.includes(preset)}
                    className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: preset,
                      borderColor: values.includes(preset) ? "#549AF2" : "transparent",
                      borderWidth: values.includes(preset) ? "3px" : "2px",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {values.includes(preset) && (
                      <m.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-white mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </m.svg>
                    )}
                  </m.button>
                ))}
              </div>
            </div>

            {/* Native Color Picker with Gradient */}
            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Выбрать из палитры</label>
              <input
                type="color"
                value={localValue.startsWith("#") ? localValue : "#549AF2"}
                onChange={(e) => setLocalValue(e.target.value)}
                className="w-full h-16 rounded-lg cursor-pointer border-2 border-primary/20"
              />
              
              <m.button
                onClick={() => {
                  if (localValue.startsWith("#")) {
                    handleAddColor(localValue);
                    handleSetShowPicker(false);
                  }
                }}
                className="w-full mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:shadow-lg active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Добавить цвет
              </m.button>
            </div>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
