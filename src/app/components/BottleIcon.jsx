import { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';



export function BottleIcon({
  remainingVolume,
  maxVolume = 1000,
  onVolumeChange,
  editable = true
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(remainingVolume.toString());

  // Update editValue when remainingVolume changes
  useEffect(() => {
    setEditValue(remainingVolume.toString());
  }, [remainingVolume]);

  const fillPercentage = Math.min(100, Math.max(0, remainingVolume / maxVolume * 100));

  const getFillColor = (percentage) => {
    if (percentage >= 60) return '#3b82f6'; // blue-500
    if (percentage >= 30) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(editValue);
    if (!isNaN(newVolume) && newVolume >= 0 && newVolume <= maxVolume) {
      onVolumeChange?.(newVolume);
      setIsEditing(false);
    } else {
      alert(`Please enter a valid volume between 0 and ${maxVolume} mL`);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditValue(remainingVolume.toString());
    setIsEditing(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      {/* Bottle SVG */}
      <div className="relative" style={{ width: '32px', height: '48px' }}>
        <svg
          viewBox="0 0 32 48"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg">
          
          {/* Bottle outline */}
          <path
            d="M11 0 L11 4 L10 4 Q8 4 8 6 L8 44 Q8 46 10 46 L22 46 Q24 46 24 44 L24 6 Q24 4 22 4 L21 4 L21 0 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5" />
          
          
          {/* Bottle fill */}
          <defs>
            <clipPath id={`bottle-clip-${remainingVolume}`}>
              <path d="M10 6 L10 44 Q10 45 11 45 L21 45 Q22 45 22 44 L22 6 Z" />
            </clipPath>
          </defs>
          
          <rect
            x="10"
            y={6 + 38 * (100 - fillPercentage) / 100}
            width="12"
            height={38 * fillPercentage / 100}
            fill={getFillColor(fillPercentage)}
            clipPath={`url(#bottle-clip-${remainingVolume})`}
            opacity="0.8" />
          
          
          {/* Cap */}
          <rect
            x="11"
            y="0"
            width="10"
            height="4"
            rx="1"
            fill="#64748b" />
          
        </svg>
      </div>

      {/* Volume info and edit */}
      <div className="flex-1">
        <div className="text-xs text-gray-600 mb-1">Remaining</div>
        {isEditing ?
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-16 px-1 py-0.5 text-xs border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            min="0"
            max={maxVolume}
            step="10"
            onClick={(e) => e.stopPropagation()} />
          
            <span className="text-xs text-gray-600">/ {maxVolume} mL</span>
            <button
            onClick={handleSave}
            className="p-0.5 text-green-600 hover:bg-green-50 rounded"
            title="Save">
            
              <Check className="w-3 h-3" />
            </button>
            <button
            onClick={handleCancel}
            className="p-0.5 text-red-600 hover:bg-red-50 rounded"
            title="Cancel">
            
              <X className="w-3 h-3" />
            </button>
          </div> :

        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {remainingVolume} / {maxVolume} mL
            </span>
            {editable && onVolumeChange &&
          <button
            onClick={handleEdit}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition flex-shrink-0"
            title="Edit volume">
            
                <Edit2 className="w-4 h-4" />
              </button>
          }
          </div>
        }
      </div>
    </div>);

}